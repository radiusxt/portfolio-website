"use client";

import {
  Flex,
  Button,
  Input,
  Textarea,
  Heading,
  Text,
  Column,
  IconButton,
  ShineFx
} from "@once-ui-system/core";
import React, { useState } from "react";

export const ContactForm = () => {
  const [formData, setFormData] = useState({name: "", email: "", description: ""});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const MAX_LENGTH: number = 500

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ 
      ...prev,
      [name]: value
    }));
  };

  const handleClear = (field: 'name' | 'email') => {
    setFormData(prev => ({ ...prev, [field]: "" }));
  };

  const handleEmail = formData.email.length > 0 && 
    !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (status === "loading") return;
    if (!formData.email.includes("@")) return setStatus("error"); 

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
    <Column fillWidth horizontal="center" gap="l" maxWidth="s">
      <Heading variant="display-default-s" paddingBottom="16" style={{ letterSpacing: "0px" }}>
        Get in Touch
      </Heading>
      <Text variant="heading-default-s" align="center" paddingBottom="12">
        For work opportunities, collaborations or other inquiries, please complete the form below.
      </Text>
      <form onSubmit={handleSubmit} style={{ width: "100%" }}>
        <Flex direction="column" gap="20">
          <Input
            label="Name*"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
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
          <Textarea
            label="Message*"
            id="description"
            name="description"
            value={formData.description}
            lines={12}
            onChange={handleChange}
            maxLength={MAX_LENGTH}
            resize="none"
            characterCount
            required
          />
          <Button fillWidth variant="primary" type="submit" loading={status === "loading"}>
            <ShineFx speed={2} opacity={1} inverse>
                Send
            </ShineFx>
          </Button>
          {status === "success" && (
            <Text variant="heading-default-s" align="center" color="success-strong" marginTop="4">
              Message Received! I will get in touch with you shortly.
            </Text>
          )}
          {status === "error" && (
            <Text variant="body-default-s" align="center" color="danger-strong" marginTop="4">
              Something went wrong. Please try again.
            </Text>
          )}
        </Flex>
      </form>
    </Column>
  );
};
