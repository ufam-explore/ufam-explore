import { StyleSheet } from "react-native";
import { deviceWidth } from "../../utils/get-device-width";

const radius = 20;
const proporcao = 0.08;

export const styles = StyleSheet.create({
  cardContainer: {
    width: deviceWidth * (0.8 + proporcao),
    backgroundColor: "#FFF",
    borderRadius: radius,
    borderColor: "darkblue",
    borderWidth: 1,
    margin: deviceWidth * 0.06,
    padding: 10,
    maxHeight: 450,
    overflow: "hidden",
  },

  imageStyle: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    borderRadius: radius,
    opacity: 0.9,
    justifyContent: "center",
    paddingBottom: 10,
    alignSelf: "center",
  },

  imagePerfil: {
    display: "flex",
    alignItems: "center",
    borderRadius: 50,
    width: 30,
    height: 30,
  },

  userInfo: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 10,
    padding: 15,
  },

  interaction: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderRadius: 5,
    padding: 10,
  },

  icon: {
    flexDirection: "row",
    justifyContent: "center",
    borderRadius: 5,
    padding: "auto",
  },

  container: {
    flexDirection: "row",
    justifyContent: "center",
    color: "white",
  },

  alignItems: {
    paddingHorizontal: 10,
    paddingBottom: 10,
  },

  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    paddingHorizontal: 10,
    paddingTop: 10,
    maxHeight: 200,
    overflow: "hidden",
  },

  text: {
    fontSize: 14,
    paddingBottom: 10,
    paddingHorizontal: 10,
  },

  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    maxHeight: 65,
    overflow: "hidden",
  },

  tag: {
    backgroundColor: "#e0e0e0",
    borderRadius: 16,
  },

  tagText: {
    fontSize: 12,
    color: "#333",
  },
});
