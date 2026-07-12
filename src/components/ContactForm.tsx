"use client";

import { useState } from "react";
import {
  Button,
  Column,
  Feedback,
  Flex,
  Heading,
  IconButton,
  Input,
  ShineFx,
  Textarea
} from "@once-ui-system/core";

/* Contact form for users to get in touch via email */
export function ContactForm() {
  const [formData, setFormData] = useState({name: "", email: "", description: ""});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleClear = (field: 'name' | 'email') => {
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
      return setStatus("error");
    }

    setStatus("loading");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", description: "" });

      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <Column fillWidth horizontal="center" gap="l" paddingBottom="32" maxWidth="s">
      <Heading variant="display-default-s" paddingBottom="16" style={{ letterSpacing: "0px" }}>
        Get in Touch
      </Heading>
      <Heading variant="heading-default-s" align="center" paddingBottom="16">
        For work opportunities, collaborations or other inquiries, please complete the form below.
      </Heading>
      <form onSubmit={handleSubmit} style={{ width: "100%" }}>
        <Flex direction="column" gap="24">
          <Input
            label="Name*"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            style={{ "--neutral-alpha-weak": "var(--neutral-background-medium)" } as React.CSSProperties}
            hasSuffix={formData.name.length > 0 && (
              <IconButton
                variant="ghost"
                icon="close"
                size="s"
                onClick={() => handleClear("name")}
                aria-label="Clear"
              />
            )}
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
            style={{ "--neutral-alpha-weak": "var(--neutral-background-medium)" } as React.CSSProperties}
            hasSuffix={formData.email.length > 0 && (
              <IconButton
                variant="ghost"
                icon="close"
                size="s"
                onClick={() => handleClear("email")}
                aria-label="Clear"
              />
            )}
          />
          <Flex style={{ "--neutral-alpha-weak": "var(--neutral-background-medium)" } as React.CSSProperties}>
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
            />
          </Flex>
          <Button fillWidth variant="primary" type="submit" loading={status === "loading"} size="l">
            <ShineFx speed={2} baseOpacity={1} inverse>
                Send
            </ShineFx>
          </Button>
          {status === "success" && 
            <Feedback variant="success">
              <Flex direction="column" align="center" padding="2" style={{ letterSpacing: "0.4px" }}>
                <Heading variant="heading-default-s" onBackground="neutral-strong">
                  Message Received! I will get in touch with you shortly.
                </Heading>
              </Flex>
            </Feedback>
          }
          {status === "error" && 
            <Feedback variant="danger">
              <Flex direction="column" align="center" padding="2" style={{ letterSpacing: "0.4px" }}>
                <Heading variant="heading-default-s" onBackground="neutral-strong">
                  Error! Something went wrong. Please try again.
                </Heading>
              </Flex>
            </Feedback>
          }
        </Flex>
      </form>
    </Column>
  );
};
