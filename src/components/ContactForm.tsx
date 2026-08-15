"use client";

import { type CSSProperties, useState } from "react";
import {
  Button,
  Column,
  Heading,
  IconButton,
  Input,
  ShineFx,
  Textarea,
  useToast
} from "@once-ui-system/core";

/* Contact form for users to get in touch via email */
export function ContactForm() {
  const [formData, setFormData] = useState({name: "", email: "", message: ""});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const { addToast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleClear = (field: 'name' | 'email' | 'message') => {
    setFormData(prev => ({ ...prev, [field]: "" }));
  };

  const handleEmail = () => {
    if (!formData.email) {
      return;
    }

    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)) {
      return "Please enter a valid email address";
    }
  }

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();

    if (status === "loading") {
      return;
    }

    if (!formData.email.includes("@")) {
      addToast({
        variant: "danger",
        message: "Please enter a valid email address.",
      });

      return;
    }

    setStatus("loading");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        addToast({
          variant: "success",
          message: "Message received! I'll respond to your inquiry as soon as possible.",
        });

        setFormData({ name: "", email: "", message: "" });

      } else {
        addToast({
          variant: "danger",
          message: "Something went wrong. Please try again.",
        });
      }

    } catch (error) {
      addToast({
        variant: "danger",
        message: "Something went wrong. Please try again.",
      });

    } finally {
      setStatus("idle");
    }
  };

  return (
    <Column fillWidth horizontal="center" gap="l">
      <Heading variant="display-default-m" paddingBottom="16">
        Get in Touch
      </Heading>
      <Heading variant="heading-default-s" align="center" paddingBottom="16">
        Let's build together. Send a message below for work opportunities or partnership inquiries.
      </Heading>
      <form onSubmit={handleSubmit} style={{ width: "100%" }}>
        <Column
          gap="24"
          style={{ "--neutral-alpha-weak": "var(--neutral-background-medium)" } as CSSProperties}
        >
          <Input
            label="Name*"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            hasSuffix={formData.name.length > 0 &&
              <IconButton
                variant="ghost"
                icon="close"
                size="s"
                aria-label="clear"
                onClick={() => handleClear("name")}
              />
            }
          />
          <Input
            label="Email*"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            validate={handleEmail}
            required
            hasSuffix={formData.email.length > 0 &&
              <IconButton
                variant="ghost"
                icon="close"
                size="s"
                aria-label="clear"
                onClick={() => handleClear("email")}
              />
            }
          />
          <Textarea
            label="Message*"
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            lines={10}
            maxLength={500}
            resize="none"
            required
            characterCount
            hasSuffix={formData.message.length > 0 &&
              <IconButton
                variant="ghost"
                icon="close"
                size="s"
                aria-label="clear"
                onClick={() => handleClear("message")}
                style={{
                  position: "absolute",
                  top: "calc(-1 * var(--static-space-128))",
                  right: "var(--static-space-12)"
                }}
              />
            }
          />
          <Button fillWidth variant="primary" type="submit" size="l" loading={status === "loading"}>
            <ShineFx baseOpacity={1} speed={2} inverse>
              Send
            </ShineFx>
          </Button>
        </Column>
      </form>
    </Column>
  );
};
