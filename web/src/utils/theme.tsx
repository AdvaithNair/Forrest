import { createMuiTheme } from '@material-ui/core/styles';
import {COLORS, ReducerContext} from '@app/common';
import {useContext} from "react";
import {UserContext} from "../context/context";

const theme = createMuiTheme({
    palette: {
      type: 'light',
      primary: { 500: COLORS.SECONDARY }
    },
    typography: {
      fontFamily: `"Montserrat", "Helvetica", "Arial", sans-serif`,
      fontSize: 14,
      fontWeightLight: 300,
      fontWeightRegular: 400,
      fontWeightMedium: 500
    }
  });

export default theme;
