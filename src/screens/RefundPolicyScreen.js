import React from "react";
import { Text, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import refundStyles from "../styles/RefundPolicyScreenStyles";

export default function RefundPolicyScreen() {
  return (
    <ScrollView style={refundStyles.scroll}>
      <LinearGradient
        colors={["#fff1e6", "#ffe4f0", "#f3e8ff"]}
        style={refundStyles.container}
      >
        {/* Title */}
        <Text style={refundStyles.title}>Refund & Exchange Policy</Text>
        <Text style={refundStyles.updated}>
          At CherryTails, we’re committed to providing high-quality products and
          a smooth shopping experience.
        </Text>

        {/* NO REFUND */}
        <Text style={refundStyles.heading}>🚫 No Refunds</Text>
        <Text style={refundStyles.text}>
          We do not offer refunds on any purchases made on our website. All
          sales are final.
        </Text>

        {/* EXCHANGE */}
        <Text style={refundStyles.heading}>🔁 Exchange Only</Text>
        <Text style={refundStyles.text}>
          If you receive a damaged, defective, or incorrect product, we offer a
          one-time exchange for the same item or another item of equal value,
          subject to availability.
        </Text>

        {/* ELIGIBILITY */}
        <Text style={refundStyles.heading}>📌 Eligibility for Exchange</Text>
        <Text style={refundStyles.text}>
          • You must notify us within 3 days of receiving your order.{"\n"}• The
          product must be unused with original tags and packaging.{"\n"}• Proof
          of purchase and clear images of the issue must be provided.
        </Text>

        {/* HOW TO REQUEST */}
        <Text style={refundStyles.heading}>📦 How to Request an Exchange</Text>
        <Text style={refundStyles.text}>
          Email us at cherrytails19@gmail.com with your order number and issue
          details. Attach images of the product if damaged or incorrect. Our
          team will guide you through the process.
        </Text>

        {/* IMPORTANT NOTES */}
        <Text style={refundStyles.heading}>❗ Important Notes</Text>
        <Text style={refundStyles.text}>
          • No exchanges for change of mind, color preference, or wrong size
          ordered.{"\n"}• Return shipping charges are borne by the customer
          unless the error is from our side.{"\n"}• Thank you for supporting
          small businesses 💖
        </Text>
      </LinearGradient>
    </ScrollView>
  );
}


