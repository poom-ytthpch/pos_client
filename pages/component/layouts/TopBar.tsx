import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AdbIcon from "@mui/icons-material/Adb";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import BarChartIcon from "@mui/icons-material/BarChart";
import GamepadIcon from "@mui/icons-material/Gamepad";
import ViewInArIcon from "@mui/icons-material/ViewInAr";
import Config from "../../../config.json";
import { useEffect } from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import Router, { useRouter } from "next/router";
import parseJwt from "../../../common/jwt-parse";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import LoupeIcon from "@mui/icons-material/Loupe";
import Swal from "sweetalert2";
import { NextPage } from "next";
import Loading from "./Loading";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { signOut } from "../../../store";
import MyAppBar from "../materials/MyAppBar";
import MyDrawer from "../materials/MyDrawer";
const drawerWidth = 240;

const Icons = [
  { name: "BarChartIcon", icon: <BarChartIcon key={0} /> },
  { name: "GamepadIcon", icon: <GamepadIcon key={1} /> },
  { name: "ViewInArIcon", icon: <ViewInArIcon key={2} /> },
  { name: "PersonAddAltIcon", icon: <PersonAddAltIcon key={3} /> },
  { name: "LoupeIcon", icon: <LoupeIcon key={4} /> },
];

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "space-between",
}));

interface UserRole {
  auth: { userRole: string };
}

interface UserInfo {
  auth: { userInfo: object };
}


const TopBar: NextPage = (): React.ReactElement => {
  const dispatch = useDispatch();
  const router = useRouter()
  let userInfo: any;
  userInfo = useSelector<UserInfo>((state) => state.auth.userInfo);
  const userRole = useSelector<UserRole>((state) => state.auth.userRole);

  const theme = useTheme();
  const [open, setOpen] = React.useState<boolean>(false);
  const [openLogin, setOpenLogin] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);

  useEffect(() => {
    const expire = setInterval(async () => {
      if (userInfo.token !== "") {
        const decodedJwt = await parseJwt(userInfo.token);

        console.log(Number(decodedJwt.exp) * 1000 - Date.now());

        if (Date.now() >= Number(decodedJwt.exp) * 1000) {
          Swal.fire({
            icon: "error",
            title: "Sign In Has Expired!",
            text: "Please Sign In Again",
            color: "#FFFFFF",
            background: "#191919",
            cancelButtonText: "OK",
            showCancelButton: true,
            showConfirmButton: false,
          });
          await Router.push("/");
          await handleLogout();
          await clearInterval(expire);
        }
      } else {
        await clearInterval(expire);
      }

      setTimeout(() => {
        setLoading(false);
      }, 100);
    }, 1000);
  }, [userInfo]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleLogout = async () => {
    await router.push("/auth")

    await dispatch(signOut());
    // await setUserRole("");

    // await setUserInfo({});
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      {loading && <Loading />}

      <CssBaseline />
      <MyAppBar position="static" >
        <Toolbar>
          {userInfo.id === undefined ? (
            <></>
          ) : (
            <IconButton
              className="topbar-fadein"
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{ ...(open && { display: "none" }) }}
            >
              <MenuIcon />
            </IconButton>
          )}

          <Box sx={{ flexGrow: 1 }}>
            {!open && (
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  justifyContent: "flex-star",
                }}
                className="topbar-fadein"
              >
                <Box
                  onClick={() => {
                    router.push("/");
                  }}
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                >
                  <AdbIcon fontSize="large" />
                  <Typography
                    variant="h6"
                    sx={{
                      mr: 2,
                      fontFamily: "monospace",
                      fontWeight: 700,
                      letterSpacing: ".3rem",
                      color: "inherit",
                      textDecoration: "none",
                    }}
                  >
                    {Config.logoName.toLocaleUpperCase()}
                  </Typography>
                </Box>
              </Box>
            )}
          </Box>
          {userInfo.name !== undefined ? (
            <Box
              sx={{ display: "flex", flexWrap: "wrap", alignItems: "center" }}
              className="topbar-fadein"
            >
              <Typography
                variant="h6"
                sx={{
                  mr: 2,
                  // fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".1rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                {userInfo.name}
              </Typography>
              <IconButton onClick={handleLogout} color="inherit">
                <LogoutIcon fontSize="large" />
              </IconButton>
            </Box>
          ) : (
            <Box>
              <IconButton
                className="topbar-fadein"
                onClick={() => {
                  setOpenLogin(!openLogin);
                }}
                color="inherit"
              >
                <AccountCircleIcon fontSize="large" />
              </IconButton>
            </Box>
          )}
        </Toolbar>
      </MyAppBar>

      <MyDrawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        anchor="left"
        open={open}
        onClose={() => {
          handleDrawerClose();
        }}
      >
        <DrawerHeader className="topbar-fadein">
          <Box
            onClick={() => {
              router.push("/");
            }}
            sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
          >
            <AdbIcon fontSize="large" />
            <Typography
              variant="h6"
              sx={{
                mr: 2,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              {Config.logoName.toLocaleUpperCase()}
            </Typography>
          </Box>

          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />

        <List className="topbar-fadein">
          {Config.list.map((data) => {
            return (
              <ListItem key={data.name} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {Icons.map((ic) => {
                      return ic.name === data.icon && ic.icon;
                    })}
                  </ListItemIcon>
                  <ListItemText primary={data.name.toLocaleUpperCase()} />
                </ListItemButton>
              </ListItem>
            );
          })}
          {userRole === "admin" ? (
            <>
              <Divider />
              {Config.adminList.map((data) => {
                return (
                  <ListItem key={data.name} disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        {Icons.map((ic) => {
                          return ic.name === data.icon && ic.icon;
                        })}
                      </ListItemIcon>
                      <ListItemText primary={data.name.toLocaleUpperCase()} />
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </>
          ) : (
            <></>
          )}
        </List>
      </MyDrawer>
    </Box>
  );
};

export default TopBar;
