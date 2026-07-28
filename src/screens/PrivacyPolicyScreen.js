import React from "react";
import { Text, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import policyStyles from "../styles/PrivacyPolicyScreenStyles";

export default function PrivacyPolicyScreen() {
  return (
    <ScrollView style={policyStyles.scroll}>
      <LinearGradient
        colors={["#fff1e6", "#ffe4f0", "#f3e8ff"]}
        style={policyStyles.container}
      >
        <Text style={policyStyles.title}>Privacy Policy</Text>
        <Text style={policyStyles.updated}>Last updated: April 2026</Text>

        {/* WHO WE ARE */}
        <Text style={policyStyles.heading}>Who we are</Text>
        <Text style={policyStyles.text}>
          Our website address is: cherrytails.com.
        </Text>

        {/* COMMENTS */}
        <Text style={policyStyles.heading}>Comments</Text>
        <Text style={policyStyles.text}>
          When visitors leave comments on the site we collect the data shown in
          the comments form, and also the visitor’s IP address and browser user
          agent string to help spam detection.
        </Text>

        <Text style={policyStyles.text}>
          An anonymized string created from your email address (also called a
          hash) may be provided to the Gravatar service to see if you are using
          it. After approval of your comment, your profile picture is visible to
          the public in the context of your comment.
        </Text>

        {/* MEDIA */}
        <Text style={policyStyles.heading}>Media</Text>
        <Text style={policyStyles.text}>
          If you upload images to the website, you should avoid uploading images
          with embedded location data (EXIF GPS). Visitors can download and
          extract location data from images.
        </Text>

        {/* COOKIES */}
        <Text style={policyStyles.heading}>Cookies</Text>
        <Text style={policyStyles.text}>
          If you leave a comment, you may opt-in to saving your name, email
          address and website in cookies. These are for convenience and last for
          one year.
        </Text>

        <Text style={policyStyles.text}>
          Login cookies last for two days, and screen options cookies last for a
          year. If you select “Remember Me”, login persists for two weeks.
        </Text>

        {/* EMBEDDED CONTENT */}
        <Text style={policyStyles.heading}>Embedded content from other websites</Text>
        <Text style={policyStyles.text}>
          Articles on this site may include embedded content (videos, images,
          etc.). These behave as if you visited the other website directly and
          may collect data, use cookies, and track interactions.
        </Text>

        {/* DATA SHARING */}
        <Text style={policyStyles.heading}>Who we share your data with</Text>
        <Text style={policyStyles.text}>
          If you request a password reset, your IP address will be included in
          the reset email.
        </Text>

        {/* DATA RETENTION */}
        <Text style={policyStyles.heading}>How long we retain your data</Text>
        <Text style={policyStyles.text}>
          If you leave a comment, it and its metadata are retained indefinitely.
          Registered users can edit or delete their personal information at any
          time.
        </Text>

        {/* RIGHTS */}
        <Text style={policyStyles.heading}>What rights you have over your data</Text>
        <Text style={policyStyles.text}>
          You can request an exported file of your personal data or request
          deletion of your data, except for data required for legal or security
          purposes.
        </Text>

        {/* DATA SENT */}
        <Text style={policyStyles.heading}>Where your data is sent</Text>
        <Text style={policyStyles.text}>
          Visitor comments may be checked through an automated spam detection
          service.
        </Text>
      </LinearGradient>
    </ScrollView>
  );
}

