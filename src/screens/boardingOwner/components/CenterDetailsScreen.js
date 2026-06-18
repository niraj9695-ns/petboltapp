import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  Alert,
  TextInput,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { getCenterDetails, updateCenter } from "../services/boardingOwnerService";

export default function CenterDetailsScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { centerId } = route.params || {};

  const [center, setCenter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editable, setEditable] = useState(false);
  const [form, setForm] = useState({
    center_name: "",
    description: "",
    price_per_day: "",
    total_capacity: "",
    address: "",
    city: "",
    state: "",
    zip_code: "",
  });

  useEffect(() => {
    if (centerId) {
      loadCenter();
    }
  }, [centerId]);

  const loadCenter = async () => {
    try {
      const response = await getCenterDetails(centerId);
      const data = response?.data || response;
      setCenter(data);
      setForm({
        center_name: data?.center_name || "",
        description: data?.description || "",
        price_per_day: data?.price_per_day || "",
        total_capacity: data?.total_capacity || "",
        address: data?.address || "",
        city: data?.city || "",
        state: data?.state || "",
        zip_code: data?.zip_code || "",
      });
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Unable to load center details");
    } finally {
      setLoading(false);
    }
  };

  const updateField = (key, value) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      const response = await updateCenter(centerId, form);

      if (response?.status === "success") {
        Alert.alert("Success", "Center updated successfully", [
          {
            text: "OK",
            onPress: () => {
              setEditable(false);
              loadCenter();
            },
          },
        ]);
      } else {
        Alert.alert("Error", response?.message || "Update failed");
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Update failed");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#6b21a8" />
      </View>
    );
  }

  if (!center) {
    return (
      <View style={styles.loader}>
        <Text>Center details not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>

        <Text style={styles.title}>{center.center_name}</Text>
      </View>

      <Image
        source={{
          uri:
            center.center_photos?.[0] ||
            "https://via.placeholder.com/600x300",
        }}
        style={styles.image}
      />

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Center Information</Text>

        {editable ? (
          <>
            <Input label="Center Name" value={form.center_name} onChangeText={(v) => updateField("center_name", v)} />
            <Input label="Description" value={form.description} onChangeText={(v) => updateField("description", v)} multiline />
            <Input label="Price per day" value={form.price_per_day} onChangeText={(v) => updateField("price_per_day", v)} keyboardType="numeric" />
            <Input label="Total capacity" value={form.total_capacity} onChangeText={(v) => updateField("total_capacity", v)} keyboardType="numeric" />
            <Input label="Address" value={form.address} onChangeText={(v) => updateField("address", v)} />
            <Input label="City" value={form.city} onChangeText={(v) => updateField("city", v)} />
            <Input label="State" value={form.state} onChangeText={(v) => updateField("state", v)} />
            <Input label="Zip code" value={form.zip_code} onChangeText={(v) => updateField("zip_code", v)} />
          </>
        ) : (
          <>
            <Info label="Description" value={center.description} />
            <Info label="Price per day" value={`₹${center.price_per_day}`} />
            <Info label="Capacity" value={center.total_capacity} />
            <Info label="Address" value={center.address} />
            <Info label="City" value={center.city} />
            <Info label="State" value={center.state} />
            <Info label="Zip code" value={center.zip_code} />
          </>
        )}
      </View>

      <TouchableOpacity
        style={styles.editButton}
        onPress={() => {
          if (editable) {
            handleSave();
          } else {
            setEditable(true);
          }
        }}
      >
        <Text style={styles.editButtonText}>
          {editable ? (saving ? "Saving..." : "Save Changes") : "Edit Center"}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const Info = ({ label, value }) => (
  <View style={styles.infoRow}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{value || "-"}</Text>
  </View>
);

const Input = ({ label, value, onChangeText, multiline = false, keyboardType = "default" }) => (
  <View style={styles.inputContainer}>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      style={[styles.input, multiline && styles.multilineInput]}
      value={value}
      onChangeText={onChangeText}
      multiline={multiline}
      keyboardType={keyboardType}
    />
  </View>
);

const styles = {
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 18,
    paddingBottom: 8,
  },
  backText: {
    color: "#6b21a8",
    fontWeight: "700",
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginTop: 10,
  },
  image: {
    width: "100%",
    height: 220,
  },
  card: {
    backgroundColor: "#fff",
    margin: 16,
    borderRadius: 16,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#6b21a8",
    marginBottom: 12,
  },
  infoRow: {
    marginBottom: 12,
  },
  label: {
    color: "#6b7280",
    fontSize: 13,
  },
  value: {
    color: "#111827",
    fontWeight: "600",
    marginTop: 4,
  },
  inputContainer: {
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginTop: 4,
  },
  multilineInput: {
    minHeight: 90,
    textAlignVertical: "top",
  },
  editButton: {
    backgroundColor: "#6b21a8",
    marginHorizontal: 16,
    marginBottom: 20,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  editButtonText: {
    color: "#fff",
    fontWeight: "700",
  },
};
