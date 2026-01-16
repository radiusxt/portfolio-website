"use client";

import React, { useState } from "react";
import { Flex, Button, Input, Textarea, Heading, Text, Column, IconButton, ShineFx } from "@once-ui-system/core";

export const ContactForm = () => {
  const [formData, setFormData] = useState({name: "", email: "", description: ""});
  const [touched, setTouched] = useState({email: false});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: value
    }));
  };

  const handleTouch = (e: React.FocusEvent<HTMLInputElement>) => {
    setTouched(prev => ({
      ...prev,
      [e.target.name]: true
    }));
  };

  const handleClear = (field: 'name' | 'email') => {
    setFormData(prev => ({ ...prev, [field]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

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
    <Column fillWidth horizontal="center" gap="l" maxWidth="s">
      <Heading variant="display-default-s">Get in Touch</Heading>
      <Text variant="heading-default-s" align="center" style={{ lineHeight: "1.5" }}>
        For work opportunities, collaborations or other inquiries, please complete the form below.
      </Text>
      <form onSubmit={handleSubmit} style={{ width: "100%" }}>
        <Flex direction="column" gap="20">
          <Input
            label="Name*"
            id="name"
            name="name"
            value={formData.name}
            required
            onChange={handleChange}
            hasSuffix={
              formData.name.length > 0 ? (
                <IconButton 
                  variant="ghost" 
                  icon="close" 
                  size="s" 
                  onClick={() => handleClear("name")}
                  aria-label="Clear"
                />
              ) : null
            }
          />
          <Input
            label="Email*"
            id="email"
            name="email"
            type="email"
            value={formData.email}
            required
            onChange={handleChange}
            onBlur={handleTouch}
            error={touched.email && (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email))}
            hasSuffix={
              formData.email.length > 0 ? (
                <IconButton 
                  variant="ghost" 
                  icon="close" 
                  size="s" 
                  onClick={() => handleClear("email")}
                  aria-label="Clear"
                />
              ) : null
            }
          />
          <Textarea
            label="Message*"
            id="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            required
          />
          <Button 
            fillWidth 
            variant="primary" 
            type="submit"
            loading={status === "loading"}
          >
            <ShineFx speed={2} opacity={1} inverse>
                Send
            </ShineFx>
          </Button>
          {status === "success" && (
            <Text variant="heading-default-s" align="center" onBackground="success-strong" marginTop="4">
              Message Received! I will get in touch with you shortly.
            </Text>
          )}
        </Flex>
      </form>
    </Column>
  );
};
