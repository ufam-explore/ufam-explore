// components/PostCard.tsx
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Alert, Image, Pressable, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { FeedScreenNavigationProp } from "../../routes/types";
import { savePost } from "../../services/api"; // Importe as funções corretas
import { ISavePostRequest } from "../../services/types";
import { IStore } from "../../store";
import { updateCurrentPost } from "../../store/post/actions";
import { useVoteHandlers } from "../../utils/votes/useVoteHandlers";
import { HashtagInPost } from "../hashtags";
import { styles } from "./styles";
import { PostCardProps } from "./types";

const profileImage = require("../../assets/img_test.jpg");

export const PostCard = ({ post }: PostCardProps) => {
  const navigation = useNavigation<FeedScreenNavigationProp>();
  const [saved, setSaved] = useState<boolean>(post.isSaved); // Estado local para controlar o salvamento
  const { id } = useSelector((state: IStore) => state.user.user);

  const {
    handleUpvote,
    handleDownvote,
    upvoted,
    downvoted,
    currentUpvote,
    currentDownvote,
  } = useVoteHandlers(post.id);

  // Função para lidar com a navegação para o post completo
  const handleClick = () => {
    updateCurrentPost(post);
    navigation.navigate("ExtendPost");
  };

  // Função para salvar o post
  const handleSave = async () => {
    try {
      if (!saved) {
        // Caso não esteja salvo, salva o post
        await handleActualSave();
      } else {
        // Caso contrário, desfaz a ação de salvar
        await handleUnsave();
      }
    } catch (error) {
      console.error("Erro ao salvar post:", error);
      Alert.alert(
        "Erro",
        "Ocorreu um erro ao salvar o post. Por favor, tente novamente."
      );
    }
  };

  const handleActualSave = async () => {
    const data: ISavePostRequest = {
      usuarioId: id,
      postagemId: post.id,
    };
    await savePost(data);
    setSaved(true);
  };

  const handleUnsave = async () => {
    const data: ISavePostRequest = {
      usuarioId: id,
      postagemId: post.id,
    };
    try {
      await savePost(data);
    } catch (error) {
      console.error("Erro ao desfazer salvar post:", error);
      Alert.alert(
        "Erro",
        "Ocorreu um erro ao desfazer a ação de salvar o post. Por favor, tente novamente."
      );
    }
    setSaved(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        <Pressable onPress={handleClick}>
          <View style={styles.userInfo}>
            <Image style={styles.imagePerfil} source={profileImage} />
            <Text>@{post.usuario?.username}</Text>
          </View>

          {post.imagemUrl && (
            <Image style={styles.imageStyle} source={{ uri: post.imagemUrl }} />
          )}

          <Text style={styles.title}>{post.titulo}</Text>
          <Text style={styles.text} numberOfLines={5}>
            {post.texto}
          </Text>

          {post.tags && post.tags.length > 0 && (
            <View style={styles.tagsContainer}>
              {post.tags.map((tag) => (
                <HashtagInPost key={tag.id} name={tag.nome} />
              ))}
            </View>
          )}

          <View style={styles.interaction}>
            <Pressable style={styles.icon}>
              <Ionicons name="chatbubbles-outline" size={25} />
            </Pressable>

            <Pressable style={styles.icon} onPress={handleUpvote}>
              <MaterialCommunityIcons
                name={upvoted ? "arrow-up-bold" : "arrow-up-bold-outline"}
                size={upvoted ? 26 : 24}
                color={upvoted ? "green" : "black"}
              />
              <Text>{currentUpvote}</Text>
            </Pressable>

            <Pressable style={styles.icon} onPress={handleDownvote}>
              <MaterialCommunityIcons
                name={downvoted ? "arrow-down-bold" : "arrow-down-bold-outline"}
                size={downvoted ? 26 : 24}
                color={downvoted ? "red" : "black"}
              />
              <Text>{currentDownvote}</Text>
            </Pressable>

            <Pressable style={styles.icon} onPress={handleSave}>
              <MaterialCommunityIcons
                name={saved ? "bookmark" : "bookmark-outline"}
                size={25}
                color={saved ? "darkblue" : "black"}
              />
            </Pressable>
          </View>
        </Pressable>
      </View>
    </View>
  );
};
