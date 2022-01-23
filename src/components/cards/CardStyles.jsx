import { makeStyles } from "@mui/styles";
import Color from "color";

export const cardStyles = makeStyles(() => ({
  actionArea: {
    borderColor: "#000000",
    borderRadius: 16,
    transition: "0.2s",
    "&:hover": {
      transform: "scale(1.1)",
    },
    marginBottom: 5,
  },
  card: () => ({
    width: 200,
    height: 300,
    borderColor: "#000000",
    backgroundColor: "#d6f0ea",
    borderRadius: 16,
    textAlign: "center",
    boxShadow: "none",
    "&:hover": {
      boxShadow: `0 6px 12px 0 ${Color("#ffffff").rotate(-12).darken(0.2).fade(0.5)}`,
    },
  }),
  content: () => {
    return {
      width: "100%",
    };
  },
  title: {
    width: "9rem",
    fontFamily: "Keania One",
    fontSize: "0.9rem",
    color: "#0f0f0f",
    textAlign: "center",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  subtitle: {
    fontFamily: "Montserrat",
    color: "#0f0f0f",
    opacity: 0.87,
    marginTop: "1rem",
    fontWeight: 500,
    fontSize: 14,
    textAlign: "center",
    marginBottom: "-15px",
  },
  cardPosition: {
    position: "absolute",
    bottom: 0,
    textAlign: "center",
  },
  cardContent: {
    paddingBottom: "10px",
  },
  rootBtn: {
    color: "inherit",
    "&:disabled": {
      color: "inherit",
    },
  },
}));

export const cardGridStyles = makeStyles(({ breakpoints }) => ({
  root: {
    [breakpoints.up("md")]: {
      justifyContent: "center",
    },
  },
}));

export const cardStyles2 = makeStyles(() => ({
  card: () => ({
    minHeight: 230,
    maxHeight: 300,
    width: "100%",
    borderColor: "#000000",
    backgroundColor: "#d6f0ea",
    borderRadius: 16,
    textAlign: "center",
  }),
  content: () => {
    return {
      width: "100%",
      borderColor: "#000000",
    };
  },
  title: {
    maxWidth: "12rem",
    height: "0.9rem",
    fontFamily: "Keania One",
    fontSize: "15px",
    color: "#0f0f0f",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  cardPosition: {
    position: "relative",
    bottom: 0,
    textAlign: "center",
  },
  cardContent: {
    paddingBottom: "5px",
  },
  rootBtn: {
    color: "inherit",
    "&:disabled": {
      color: "inherit",
    },
  },
}));

export const cardStyles3 = makeStyles(() => ({
  card: () => ({
    height: 280,
    width: 150,
    borderColor: "#000000",
    backgroundColor: "#d6f0ea",
    borderRadius: 16,
    textAlign: "center",
  }),
  content: () => {
    return {
      width: "100%",
      borderColor: "#000000",
      padding: "1rem 1.5rem 1.5rem",
    };
  },
  title: {
    maxWidth: "10rem",
    height: "1rem",
    fontFamily: "Keania One",
    fontSize: "15px",
    color: "#0f0f0f",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  cardPosition: {
    position: "relative",
    bottom: 0,
    textAlign: "center",
  },
  cardContent: {
    paddingBottom: "5px",
  },
  rootBtn: {
    color: "inherit",
    "&:disabled": {
      color: "inherit",
    },
  },
}));

export const cardGridStyles2 = makeStyles(({ breakpoints }) => ({
  root: {
    [breakpoints.down("xs")]: {
      justifyContent: "center",
    },
  },
}));
