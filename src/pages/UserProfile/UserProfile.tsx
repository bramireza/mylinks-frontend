import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MainLayout } from "@/layouts";
import { Link, User } from "@/types";
import { PageNotFound } from "@/pages";
import { Card, Image, Loading } from "@/components";
import { link, user } from "@/api";

const UserProfile: React.FC = () => {
  const { username } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [isFoundUser, setIsFoundUser] = useState(false);
  const [allLinks, setAllLinks] = useState<Link[]>([]);
  const [dataUser, setDataUser] = useState<User>();

  useEffect(() => {
    user
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
    link
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
                <Image alt="Avatar Profile" src={dataUser?.avatar?.secure_url ?? ""} />
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
