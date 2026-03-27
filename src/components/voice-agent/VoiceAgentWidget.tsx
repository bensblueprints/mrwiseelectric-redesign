"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, X, Mic, MicOff, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";

interface VoiceAgentWidgetProps {
  agentId?: string;
  position?: "bottom-right" | "bottom-left";
}

type CallState = "idle" | "connecting" | "connected" | "error";

export function VoiceAgentWidget({
  agentId = process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID,
  position = "bottom-right",
}: VoiceAgentWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [callState, setCallState] = useState<CallState>("idle");
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeakerOff, setIsSpeakerOff] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [transcript, setTranscript] = useState<string[]>([]);

  const conversationRef = useRef<unknown>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  const positionClasses = position === "bottom-right"
    ? "right-4 sm:right-6"
    : "left-4 sm:left-6";

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (conversationRef.current) {
        endConversation();
      }
    };
  }, []);

  const startConversation = useCallback(async () => {
    if (!agentId) {
      setErrorMessage("Voice agent not configured");
      setCallState("error");
      return;
    }

    setCallState("connecting");
    setErrorMessage(null);
    setTranscript([]);

    try {
      // Get signed URL from our API
      const response = await fetch("/api/voice-agent/signed-url");
      if (!response.ok) {
        throw new Error("Failed to initialize voice agent");
      }

      const { signedUrl } = await response.json();

      // Dynamically import ElevenLabs conversation SDK
      const { Conversation } = await import("@elevenlabs/client");

      // Request microphone permission
      await navigator.mediaDevices.getUserMedia({ audio: true });

      // Initialize audio context
      audioContextRef.current = new AudioContext();

      // Start the conversation
      const conversation = await Conversation.startSession({
        signedUrl,
        onConnect: () => {
          console.log("[VoiceAgent] Connected");
          setCallState("connected");
          setTranscript(prev => [...prev, "Connected to Mr. Wise Electric assistant..."]);
        },
        onDisconnect: () => {
          console.log("[VoiceAgent] Disconnected");
          setCallState("idle");
          conversationRef.current = null;
        },
        onError: (message: string) => {
          console.error("[VoiceAgent] Error:", message);
          setErrorMessage(message);
          setCallState("error");
        },
        onMessage: (message: { source: string; message: string }) => {
          console.log("[VoiceAgent] Message:", message);
          if (message.source === "ai") {
            setTranscript(prev => [...prev, `Assistant: ${message.message}`]);
          } else if (message.source === "user") {
            setTranscript(prev => [...prev, `You: ${message.message}`]);
          }
        },
      });

      conversationRef.current = conversation;
    } catch (error) {
      console.error("[VoiceAgent] Failed to start:", error);
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Failed to start voice conversation"
      );
      setCallState("error");
    }
  }, [agentId]);

  const endConversation = useCallback(async () => {
    if (conversationRef.current) {
      try {
        await (conversationRef.current as { endSession: () => Promise<void> }).endSession();
      } catch (error) {
        console.error("[VoiceAgent] Error ending session:", error);
      }
      conversationRef.current = null;
    }

    if (audioContextRef.current) {
      await audioContextRef.current.close();
      audioContextRef.current = null;
    }

    setCallState("idle");
    setTranscript([]);
  }, []);

  const toggleMute = useCallback(async () => {
    if (conversationRef.current) {
      const newMuted = !isMuted;
      await (conversationRef.current as { setVolume: (params: { volume: number }) => Promise<void> }).setVolume({ volume: newMuted ? 0 : 1 });
      setIsMuted(newMuted);
    }
  }, [isMuted]);

  const toggleSpeaker = useCallback(() => {
    setIsSpeakerOff(!isSpeakerOff);
    // In a real implementation, you'd control the audio output here
  }, [isSpeakerOff]);

  const handleClose = useCallback(() => {
    if (callState === "connected" || callState === "connecting") {
      endConversation();
    }
    setIsOpen(false);
  }, [callState, endConversation]);

  return (
    <>
      {/* Floating Action Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className={`fixed bottom-4 sm:bottom-6 ${positionClasses} z-50`}
          >
            <motion.button
              onClick={() => setIsOpen(true)}
              className="group relative flex items-center gap-3 bg-amber-500 hover:bg-amber-600 text-stone-900 font-semibold py-4 px-6 rounded-full shadow-2xl transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Phone className="w-5 h-5" />
              </motion.div>
              <span className="hidden sm:inline">Talk to Us</span>

              {/* Pulse ring */}
              <span className="absolute inset-0 rounded-full bg-amber-500 animate-ping opacity-25" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Voice Agent Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className={`fixed bottom-4 sm:bottom-6 ${positionClasses} z-50 w-[calc(100%-2rem)] sm:w-96`}
          >
            <div className="bg-stone-900 rounded-2xl shadow-2xl border border-stone-800 overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-amber-500 to-amber-600 px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-stone-900/20 rounded-full flex items-center justify-center">
                    <Phone className="w-5 h-5 text-stone-900" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-stone-900">Mr. Wise Electric</h3>
                    <p className="text-stone-900/70 text-sm">Voice Assistant</p>
                  </div>
                </div>
                <button
                  onClick={handleClose}
                  className="p-2 hover:bg-stone-900/10 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-stone-900" />
                </button>
              </div>

              {/* Content */}
              <div className="p-4">
                {callState === "idle" && (
                  <div className="text-center py-6">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-20 h-20 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-4"
                    >
                      <Phone className="w-10 h-10 text-amber-500" />
                    </motion.div>
                    <h4 className="text-white font-medium mb-2">
                      Ready to Help
                    </h4>
                    <p className="text-stone-400 text-sm mb-6">
                      Click below to speak with our AI assistant about your electrical needs
                    </p>
                    <Button
                      onClick={startConversation}
                      className="bg-amber-500 hover:bg-amber-600 text-stone-900 font-semibold w-full"
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      Start Conversation
                    </Button>
                  </div>
                )}

                {callState === "connecting" && (
                  <div className="text-center py-8">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className="w-16 h-16 border-4 border-amber-500/30 border-t-amber-500 rounded-full mx-auto mb-4"
                    />
                    <p className="text-white">Connecting...</p>
                    <p className="text-stone-400 text-sm mt-2">
                      Please allow microphone access
                    </p>
                  </div>
                )}

                {callState === "connected" && (
                  <div>
                    {/* Transcript area */}
                    <div className="bg-stone-800/50 rounded-lg p-3 mb-4 h-40 overflow-y-auto">
                      {transcript.length === 0 ? (
                        <p className="text-stone-500 text-sm text-center py-4">
                          Conversation will appear here...
                        </p>
                      ) : (
                        <div className="space-y-2">
                          {transcript.map((line, index) => (
                            <motion.p
                              key={index}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className={`text-sm ${
                                line.startsWith("You:")
                                  ? "text-amber-400"
                                  : line.startsWith("Assistant:")
                                    ? "text-white"
                                    : "text-stone-400 italic"
                              }`}
                            >
                              {line}
                            </motion.p>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Voice visualization */}
                    <div className="flex justify-center gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="w-1 bg-amber-500 rounded-full"
                          animate={{
                            height: [8, 24, 8],
                          }}
                          transition={{
                            duration: 0.5,
                            repeat: Infinity,
                            delay: i * 0.1,
                            ease: "easeInOut",
                          }}
                        />
                      ))}
                    </div>

                    {/* Controls */}
                    <div className="flex items-center justify-center gap-4">
                      <button
                        onClick={toggleMute}
                        className={`p-3 rounded-full transition-colors ${
                          isMuted
                            ? "bg-red-500/20 text-red-500"
                            : "bg-stone-700 text-white hover:bg-stone-600"
                        }`}
                      >
                        {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                      </button>

                      <button
                        onClick={endConversation}
                        className="p-4 bg-red-500 hover:bg-red-600 rounded-full text-white transition-colors"
                      >
                        <Phone className="w-6 h-6 rotate-[135deg]" />
                      </button>

                      <button
                        onClick={toggleSpeaker}
                        className={`p-3 rounded-full transition-colors ${
                          isSpeakerOff
                            ? "bg-red-500/20 text-red-500"
                            : "bg-stone-700 text-white hover:bg-stone-600"
                        }`}
                      >
                        {isSpeakerOff ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>
                )}

                {callState === "error" && (
                  <div className="text-center py-6">
                    <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <X className="w-8 h-8 text-red-500" />
                    </div>
                    <h4 className="text-white font-medium mb-2">
                      Connection Error
                    </h4>
                    <p className="text-stone-400 text-sm mb-4">
                      {errorMessage || "Something went wrong. Please try again."}
                    </p>
                    <Button
                      onClick={() => {
                        setCallState("idle");
                        setErrorMessage(null);
                      }}
                      variant="outline"
                      className="border-stone-600 text-white hover:bg-stone-800"
                    >
                      Try Again
                    </Button>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="px-4 py-3 bg-stone-800/50 border-t border-stone-800">
                <p className="text-stone-500 text-xs text-center">
                  Or call us directly at{" "}
                  <a href="tel:4042997932" className="text-amber-500 hover:underline">
                    (404) 299-7932
                  </a>
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
