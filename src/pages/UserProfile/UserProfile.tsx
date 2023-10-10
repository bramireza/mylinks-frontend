import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MainLayout } from "../../layouts";
import { linkServices, userServices } from "../../services";
import { Link, User } from "../../types";
import { PageNotFound } from "..";
import { Avatar, Box, Card, CardMedia, Typography } from "@mui/material";
import { Loading } from "../../components";

const UserProfile: React.FC = () => {
  const { username } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [isFoundUser, setIsFoundUser] = useState(false);
  const [allLinks, setAllLinks] = useState<Link[]>([]);
  const [dataUser, setDataUser] = useState<User>();

  useEffect(() => {
    userServices
      .getUserProfile(username!)
      .then(({ success, user }) => {
        if (success) {
          setDataUser(user);
        }
      })
      .catch((error) => {
        if (error.response.status === 404) {
          setIsLoading(false);
          setIsFoundUser(false);
        }
        console.log(error);
      });
    linkServices
      .getLinksActive(username!)
      .then(({ success, links }) => {
        if (success) {
          setAllLinks(links);
          setIsLoading(false);
          setIsFoundUser(true);
        }
      })
      .catch((error) => {
        if (error.response.status === 404) {
          setIsLoading(false);
          setIsFoundUser(false);
        }
        console.log(error);
      });
  }, [username]);

  return (
    <MainLayout>
      <>
        {isLoading ? (
          <Loading/>
        ) : (
          <>
            {isFoundUser ? (
              <Box
                sx={{
                  maxWidth: "800px",
                  margin: "0 auto",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  padding: "60px",
                }}
              >
                <Avatar
                  sx={{
                    width: 100,
                      height: 100,
                    marginBottom: "15px"
                    }}
                  src={dataUser?.pictureUrl}
                />
                <Typography
                  variant="h6"
                  component="h1"
                >{`@${username}`}</Typography>
                {
                  <>
                    {allLinks.map((link, index) => (
                      <a href={link.url} hrefLang="_blank" key={index}>
                        {link.name}
                      </a>
                    ))}
                  </>
                }
              </Box>
            ) : (
              <PageNotFound />
            )}
          </>
        )}
      </>
    </MainLayout>
  );
};

export default UserProfile;
