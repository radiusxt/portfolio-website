"use client";

import { type CSSProperties, useState } from "react";
import {
  Button,
  Column,
  Flex,
  Heading,
  IconButton,
  Input,
  ShineFx,
  Textarea,
  useToast
} from "@once-ui-system/core";

/* Contact form for users to get in touch via email */
export function ContactForm() {
  const [formData, setFormData] = useState({name: "", email: "", description: ""});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const { addToast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleClear = (field: 'name' | 'email' | 'description') => {
    setFormData(prev => ({ ...prev, [field]: "" }));
  };

  const handleEmail = formData.email.length > 0 && 
    !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email);

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
        setFormData({ name: "", email: "", description: "" });

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
    <Column fillWidth horizontal="center" gap="l" paddingBottom="64" maxWidth="s">
      <Heading variant="display-default-s" paddingBottom="16" style={{ letterSpacing: "0px" }}>
        Get in Touch
      </Heading>
      <Heading variant="heading-default-s" align="center" paddingBottom="16">
        For work opportunities, collaborations or other inquiries, please complete the form below.
      </Heading>
      <form onSubmit={handleSubmit} style={{ width: "100%" }}>
        <Column gap="24" style={{ "--neutral-alpha-weak": "var(--neutral-background-medium)" } as CSSProperties}>
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
            type="email"
            value={formData.email}
            onChange={handleChange}
            error={handleEmail}
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
          <Flex>
            <Textarea
              label="Message*"
              id="description"
              name="description"
              value={formData.description}
              lines={10}
              onChange={handleChange}
              maxLength={500}
              resize="none"
              characterCount
              required
              hasSuffix={formData.description.length > 0 &&
                <IconButton
                  variant="ghost"
                  icon="close"
                  size="s"
                  aria-label="clear"
                  onClick={() => handleClear("description")}
                />
              }
            />
          </Flex>
          <Button fillWidth variant="primary" type="submit" loading={status === "loading"} size="l">
            <ShineFx speed={2} baseOpacity={1} inverse>
                Send
            </ShineFx>
          </Button>
        </Column>
      </form>
    </Column>
  );
};
