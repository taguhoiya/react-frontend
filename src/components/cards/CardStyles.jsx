import { makeStyles } from "@mui/styles";

export const cardStyles = makeStyles(() => ({
  actionArea: {
    borderColor: "#000000",
    borderRadius: 16,
    transition: "0.2s",
    "&:hover": {
      transform: "scale(1.05)",
    },
    marginBottom: 5,
  },
  card: () => ({
    width: 200,
    height: 320,
    borderColor: "#000000",
    backgroundColor: "#fff",
    borderRadius: 16,
    textAlign: "center",
    boxShadow: "none",
  }),
  content: () => {
    return {
      width: "100%",
    };
  },
  title: {
    width: "10.5rem",
    fontFamily: "Keania One",
    fontSize: "1.1rem",
    color: "#0f0f0f",
    textAlign: "center",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
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
    maxHeight: 320,
    width: "100%",
    border: "0.1px solid #bebebe",
    backgroundColor: "#fff",
    textAlign: "center",
  }),
  content: () => {
    return {
      width: "100%",
    };
  },
  title: {
    maxWidth: "12rem",
    height: "1.2rem",
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
    height: 250,
    width: 130,
    border: "0.1px solid #bebebe",
    backgroundColor: "#ffffff",
    borderRadius: 16,
    textAlign: "center",
  }),
  content: () => {
    return {
      width: "100%",
      border: "0.1px solid #bebebe",

      padding: "1rem 1.5rem 1.5rem",
    };
  },
  title: {
    maxWidth: "10rem",
    height: "1.3rem",
    fontFamily: "Keania One",
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

export const cardStyles4 = makeStyles(() => ({
  actionArea: {
    borderColor: "#000000",
    transition: "0.2s",
    "&:hover": {
      transform: "scale(1.05)",
    },
    marginBottom: 3,
  },
  card: () => ({
    width: "100%",
    height: 280,
    backgroundColor: "#fff",
    textAlign: "center",
    boxShadow: "none",
    border: "0.1px solid #bebebe",
  }),
  content: () => {
    return {
      width: "100%",
    };
  },
  title: {
    width: "7rem",
    fontFamily: "Keania One",
    fontSize: "0.8rem",
    color: "#0f0f0f",
    textAlign: "center",
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
    paddingBottom: "3px",
  },
  rootBtn: {
    color: "inherit",
    "&:disabled": {
      color: "inherit",
    },
  },
}));

export const cardStyles5 = makeStyles(() => ({
  actionArea: {
    borderColor: "#000000",
    transition: "0.2s",
    "&:hover": {
      transform: "scale(1.05)",
    },
  },
  card: () => ({
    border: "0.1px solid #bebebe",
    width: "100%",
    height: 280,
    backgroundColor: "#fff",
    textAlign: "center",
    boxShadow: "none",
  }),
  content: () => {
    return {
      width: "100%",
    };
  },
  title: {
    width: "5rem",
    fontFamily: "Keania One",
    fontSize: "0.8rem",
    color: "#0f0f0f",
    textAlign: "center",
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
    paddingBottom: "3px",
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
