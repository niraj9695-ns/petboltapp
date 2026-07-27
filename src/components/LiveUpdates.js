import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import liveUpdatesStyles from "../styles/LiveUpdatesStyles";

export default function LiveUpdates() {
  const statusUpdates = [
    { id: 1, petName: "Buddy", petEmoji: "🐕", isViewed: false },
    { id: 2, petName: "Luna", petEmoji: "🐱", isViewed: true },
    { id: 3, petName: "Max", petEmoji: "🐶", isViewed: false },
    { id: 4, petName: "Bella", petEmoji: "🐰", isViewed: true },
    { id: 5, petName: "Charlie", petEmoji: "🐹", isViewed: false },
  ];

  const feedUpdates = [
    {
      id: 1,
      petName: "Buddy",
      petEmoji: "🐕",
      caption: "Buddy had a blast playing in the yard! 🎾",
      timestamp: "2h ago",
      likes: 234,
      comments: 12,
      shares: 8,
      isVideo: false,
      color: "#8b5cf6",
    },
    {
      id: 2,
      petName: "Luna",
      petEmoji: "🐱",
      caption: "Nap time is the best time 😴💤",
      timestamp: "4h ago",
      likes: 456,
      comments: 28,
      shares: 15,
      isVideo: false,
      color: "#ec4899",
    },
    {
      id: 3,
      petName: "Max",
      petEmoji: "🐶",
      caption: "Lunch time 🍖",
      timestamp: "6h ago",
      likes: 567,
      comments: 34,
      shares: 22,
      isVideo: true,
      color: "#3b82f6",
    },
  ];

  return (
    <ScrollView style={liveUpdatesStyles.section}>
      {/* TITLE */}
      <Text style={liveUpdatesStyles.title}>
        Stay Connected With Your Pet 🐶❤️
      </Text>

      <Text style={liveUpdatesStyles.subtitle}>
        Real-time updates and daily moments
      </Text>

      {/* STORIES */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={liveUpdatesStyles.storyRow}>
          {statusUpdates.map((item) => (
            <View key={item.id} style={liveUpdatesStyles.storyItem}>
              <View
                style={[
                  liveUpdatesStyles.storyCircle,
                  {
                    borderColor: item.isViewed ? "#ddd" : "#3b82f6",
                  },
                ]}
              >
                <Text style={liveUpdatesStyles.emoji}>{item.petEmoji}</Text>
              </View>
              <Text style={liveUpdatesStyles.storyName}>{item.petName}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* FEED */}
      {feedUpdates.map((item) => (
        <View key={item.id} style={liveUpdatesStyles.card}>
          {/* image placeholder */}
          <View
            style={[
              liveUpdatesStyles.imageBox,
              { backgroundColor: item.color },
            ]}
          >
            {item.isVideo && (
              <View style={liveUpdatesStyles.playBtn}>
                <MaterialCommunityIcons
                  name="play"
                  size={30}
                  color="white"
                />
              </View>
            )}

            <Text style={liveUpdatesStyles.bigEmoji}>{item.petEmoji}</Text>

            <Text style={liveUpdatesStyles.time}>{item.timestamp}</Text>
          </View>

          {/* content */}
          <View style={liveUpdatesStyles.content}>
            <Text style={liveUpdatesStyles.name}>{item.petName}</Text>
            <Text style={liveUpdatesStyles.caption}>{item.caption}</Text>

            {/* actions */}
            <View style={liveUpdatesStyles.actions}>
              <Text>❤️ {item.likes}</Text>
              <Text>💬 {item.comments}</Text>
              <Text>🔁 {item.shares}</Text>
            </View>

            <TouchableOpacity style={liveUpdatesStyles.btn}>
              <Text style={liveUpdatesStyles.btnText}>View Full Update</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}

      {/* bottom button */}
      <TouchableOpacity style={liveUpdatesStyles.bottomBtn}>
        <Text style={liveUpdatesStyles.bottomText}>View All Updates</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}