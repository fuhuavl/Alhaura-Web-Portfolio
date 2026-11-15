"use client";

import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { profile } from "@/data/profile";
import { Button } from "./Button";
import { ease } from "./motion";

type Status = "idle" | "sending" | "success" | "error";

const field =
  "mt-2 w-full border-0 border-b border-pine/40 bg-transparent pb-3 text-lg text-pine placeholder:text-slate/70 transition-colors duration-300 focus:border-pine focus:outline-none";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [sender, setSender] = useState("");
  const [detail, setDetail] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setSender(String(data.get("name") ?? ""));
    setStatus("sending");
    setDetail("");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });
      const json = await res.json().catch(() => null);
      if (res.ok && json?.success === true) {
        setStatus("success");
        form.reset();
      } else {
        setDetail(
          typeof json?.message === "string"
            ? json.message
            : `The mail service answered with status ${res.status}.`,
        );
        setStatus("error");
      }
    } catch (err) {
      console.error("Contact form request failed:", err);
      setDetail("The mail service could not be reached from this browser.");
      setStatus("error");
    }
  }

  return (
    <div aria-live="polite">
      <AnimatePresence mode="wait" initial={false}>
        {status === "success" ? (
          <motion.div
            key="done"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease }}
            className="border-t border-pine/25 pt-8"
          >
            <p className="font-display text-3xl leading-tight md:text-4xl">
              Thank you{sender ? `, ${sender}` : ""}. Your message was sent.
            </p>
            <button
              type="button"
              onClick={() => setStatus("idle")}
              className="mt-6 text-base underline underline-offset-4"
            >
              Send another message
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={onSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-8"
          >
            <input type="hidden" name="access_key" value={profile.web3formsKey} />
            <input type="hidden" name="subject" value="New message from your portfolio" />
            <input type="hidden" name="from_name" value="Portfolio contact form" />
            <input
              type="checkbox"
              name="botcheck"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden
              className="hidden"
            />

            <div className="grid gap-8 sm:grid-cols-2">
              <label className="block text-sm">
                Your name
                <input
                  type="text"
                  name="name"
                  required
                  autoComplete="name"
                  placeholder="Jane Doe"
                  className={field}
                />
              </label>
              <label className="block text-sm">
                Your email
                <input
                  type="email"
                  name="email"
                  required
                  autoComplete="email"
                  placeholder="you@example.com"
                  className={field}
                />
              </label>
            </div>

            <label className="block text-sm">
              Message
              <textarea
                name="message"
                required
                rows={5}
                placeholder="Tell me about your idea or opportunity"
                className={`${field} resize-none`}
              />
            </label>

            <div className="flex flex-wrap items-center gap-5">
              <Button type="submit" variant="pine" disabled={status === "sending"}>
                {status === "sending" ? "Sending…" : "Send message"}
              </Button>
              {status === "error" ? (
                <p role="alert" className="max-w-[40ch] text-sm">
                  The message could not be sent. {detail}
                </p>
              ) : null}
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
