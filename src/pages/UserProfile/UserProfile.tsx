import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MainLayout } from "@/layouts";
import { linkServices, userServices } from "@/services";
import { Link, User } from "@/types";
import { PageNotFound } from "..";
import { Card, Image, Loading } from "@/components";

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
        setIsLoading(false);
        setIsFoundUser(false);

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
        setIsLoading(false);
        setIsFoundUser(false);
        console.log(error);
      });
  }, [username]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {isFoundUser ? (
            <MainLayout>
              <Card>
                <Image alt="Avatar Profile" src={dataUser?.pictureUrl ?? ""} />
                <h1>{`@${username}`}</h1>

                <div>
                  {allLinks.map((link, index) => (
                    <a href={link.url} hrefLang="_blank" key={index}>
                      {link.name}
                    </a>
                  ))}
                </div>
              </Card>
            </MainLayout>
          ) : (
            <PageNotFound />
          )}
        </>
      )}
    </>
  );
};

export default UserProfile;
