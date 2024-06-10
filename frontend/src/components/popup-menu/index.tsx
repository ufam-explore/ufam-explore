import AntDesign from "@expo/vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import {
  Alert,
  Dimensions,
  Modal,
  Pressable,
  SafeAreaView,
  Text,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import { FeedScreenNavigationProp } from "../../pages/create-post/type";
import { deletePost } from "../../services/api";
import { IStore } from "../../store";
import ConfirmationModal from "../confirm-modal";
import { styles } from "./styles";
import { Option } from "./types";

const { width, height } = Dimensions.get("window");

const PopupMenu = () => {
  const [visible, setVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<FeedScreenNavigationProp>();
  const post = useSelector((state: IStore) => state.post.editingPost);

  const handleDeletePost = async () => {
    setLoading(true);
    try {
      const response = await deletePost(post?.id ?? "");
      if (response.status === 200) {
        Alert.alert("Sucesso", "Post excluído com sucesso");
        navigation.navigate("Home");
      }
    } catch (error) {
      Alert.alert("Erro", "Não foi possível excluir o post");
    } finally {
      setLoading(false);
      setModalVisible(false);
      setVisible(false);
    }
  };

  const options: Option[] = [
    {
      title: "Adicionar ao calendário",
      icon: "calendar",
      action: () => alert("calendario"),
    },
    {
      title: "Editar post",
      icon: "edit",
      action: () => {
        setVisible(false);
        navigation.navigate("EditPost");
      },
    },
    {
      title: "Salvar post",
      icon: "save",
      action: () => alert("Salvando post"),
    },
    {
      title: "Excluir post",
      icon: "delete",
      action: () => {
        setModalVisible(true);
      },
    },
  ];

  return (
    <View style={styles.popupContainer}>
      <ConfirmationModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onConfirm={handleDeletePost}
        text="Você tem certeza que deseja apagar o post?"
        loading={loading}
      />
      <Pressable onPress={() => setVisible(!visible)}>
        <AntDesign name="ellipsis1" size={24} color="darkblue" />
      </Pressable>

      <Modal transparent visible={visible}>
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setVisible(false)}
        >
          <SafeAreaView style={styles.safeAreaView} />
          <View style={styles.popup}>
            {options.map((op, i) => (
              <Pressable key={i} onPress={op.action}>
                <View style={styles.option}>
                  <AntDesign name={op.icon} size={24} color="darkblue" />
                  <Text style={styles.optionText}>{op.title}</Text>
                </View>
              </Pressable>
            ))}
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

export default PopupMenu;
