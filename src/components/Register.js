import React, { useState } from "react";

import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
} from "react-native";
import {
  AntDesign,
  Feather,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";

import { SafeAreaView } from "react-native-safe-area-context";

import LoginForm from "./auth/LoginForm";
import OTPVerification from "./auth/OTPVerification";
import RoleSelector from "./auth/RoleSelector";
import PetOwnerRegister from "./auth/PetOwnerRegister";
import BoardingOwnerRegister from "./auth/BoardingOwnerRegister";

import AsyncStorage from "@react-native-async-storage/async-storage";
import registerStyles from "../styles/RegisterScreenStyles";

export default function RegisterScreen({ navigation }) {
  const [isLogin, setIsLogin] = useState(true);

  const [step, setStep] = useState("auth");

  const [role, setRole] = useState("pet_owner");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [otpType, setOtpType] = useState("");

  const constinueAsGuest = async (guestRole) => {
    await AsyncStorage.setItem("guestRole", guestRole);

    await AsyncStorage.setItem("isGuest", "true");

    navigation.reset({
      index: 0,
      routes: [
        {
          name:
            guestRole === "boarding_owner" ? "GuestBoarding" : "GuestPetOwner",
        },
      ],
    });
  };

  return (
    <SafeAreaView style={registerStyles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={registerStyles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={registerStyles.heroContainer}>
            <View style={registerStyles.textContainer}>
              <Text style={registerStyles.welcomeTitle}>Welcome Back!</Text>

              <Text style={registerStyles.welcomeSubtitle}>
                Sign in to your account and care for your{" "}
                <Text style={registerStyles.highlightText}>furry friend.</Text>
              </Text>
            </View>

            <Image
              source={require("../../assets/pets.png")}
              style={registerStyles.petImage}
              resizeMode="contain"
            />
          </View>

          {step === "auth" && (
            <>
              <View style={registerStyles.segmentContainer}>
                <TouchableOpacity
                  activeOpacity={0.9}
                  style={[
                    registerStyles.segmentButton,
                    isLogin && registerStyles.segmentActive,
                  ]}
                  onPress={() => setIsLogin(true)}
                >
                  <View style={registerStyles.segmentContent}>
                    <MaterialCommunityIcons
                      name="paw"
                      size={18}
                      color={isLogin ? "#6D28D9" : "#6B7280"}
                    />

                    <Text
                      style={[
                        registerStyles.segmentText,
                        isLogin && registerStyles.segmentActiveText,
                      ]}
                    >
                      Sign In
                    </Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  activeOpacity={0.9}
                  style={[
                    registerStyles.segmentButton,
                    !isLogin && registerStyles.segmentActive,
                  ]}
                  onPress={() => setIsLogin(false)}
                >
                  <View style={registerStyles.segmentContent}>
                    <MaterialCommunityIcons
                      name="account-outline"
                      size={22}
                      color={!isLogin ? "#6D28D9" : "#6B7280"}
                    />

                    <Text
                      style={[
                        registerStyles.segmentText,
                        !isLogin && registerStyles.segmentActiveText,
                      ]}
                    >
                      Sign Up
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>

              {isLogin ? (
                <View style={registerStyles.authCard}>
                  <LoginForm
                    setStep={setStep}
                    setOtpType={setOtpType}
                    setEmail={setEmail}
                    setPassword={setPassword}
                  />

                  <View style={registerStyles.guestContainer}>
                    <Text style={registerStyles.guestTitle}>
                      Explore as Guest
                    </Text>

                    <Text style={registerStyles.guestSubtitle}>
                      Choose how you'd like to continue
                    </Text>

                    <View style={registerStyles.guestCardsRow}>
                      <TouchableOpacity
                        style={registerStyles.guestCard}
                        onPress={() => constinueAsGuest("pet_owner")}
                      >
                        <View style={registerStyles.iconCirclePurple}>
                          <Text style={registerStyles.iconText}>🐾</Text>
                        </View>

                        <Text style={registerStyles.guestCardTitle}>
                          Pet Owner
                        </Text>

                        <Text style={registerStyles.guestCardDescription}>
                          Explore and manage your pet care
                        </Text>

                        <View style={registerStyles.arrowPurple}>
                          <AntDesign name="right" size={10} color="#9333EA" />
                        </View>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={registerStyles.guestCard}
                        onPress={() => constinueAsGuest("boarding_owner")}
                      >
                        <View style={registerStyles.iconCircleGreen}>
                          <Text style={registerStyles.iconText}>🏠</Text>
                        </View>

                        <Text style={registerStyles.guestCardTitle}>
                          Boarding Owner
                        </Text>

                        <Text style={registerStyles.guestCardDescription}>
                          Manage your boarding business
                        </Text>

                        <View style={registerStyles.arrowGreen}>
                          <AntDesign name="right" size={10} color="#22C55E" />
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              ) : (
                <View style={registerStyles.authCard}>
                  <RoleSelector role={role} setRole={setRole} />

                  {role === "pet_owner" ? (
                    <PetOwnerRegister
                      setStep={setStep}
                      setOtpType={setOtpType}
                      setEmail={setEmail}
                    />
                  ) : (
                    <BoardingOwnerRegister
                      setStep={setStep}
                      setOtpType={setOtpType}
                      setEmail={setEmail}
                    />
                  )}
                </View>
              )}
            </>
          )}

          {step === "otp" && (
            <OTPVerification
              email={email}
              otpType={otpType}
              password={password}
              setStep={setStep}
              onSuccess={() => {
                setStep("auth");
                setIsLogin(true);
              }}
              onBack={() => setStep("auth")}
              navigation={navigation}
            />
          )}

          <View style={registerStyles.featuresContainer}>
            <View style={registerStyles.featureItem}>
              <Feather name="shield" size={26} color="#8B5CF6" />

              <Text style={registerStyles.featureTitle}>Safe & Secure</Text>

              <Text style={registerStyles.featureSubtitle}>
                Your data is protected
              </Text>
            </View>

            <View style={registerStyles.featureDivider} />

            <View style={registerStyles.featureItem}>
              <MaterialCommunityIcons name="paw" size={26} color="#8B5CF6" />

              <Text style={registerStyles.featureTitle}>Trusted Care</Text>

              <Text style={registerStyles.featureSubtitle}>
                Verified sitters{"\n"}& homes
              </Text>
            </View>

            <View style={registerStyles.featureDivider} />

            <View style={registerStyles.featureItem}>
              <MaterialIcons name="event" size={26} color="#8B5CF6" />

              <Text style={registerStyles.featureTitle}>Easy Booking</Text>

              <Text style={registerStyles.featureSubtitle}>
                Quick &{"\n"}hassle-free
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
