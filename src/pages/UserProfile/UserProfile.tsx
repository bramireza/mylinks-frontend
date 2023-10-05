import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MainLayout } from "../../layouts";
import { adminServices } from "../../services";
import { Link } from "../../types";
import { PageNotFound } from "..";

const UserProfile: React.FC = () => {
  const { username } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [isFoundUser, setIsFoundUser] = useState(false);
  const [allLinks, setAllLinks] = useState<Link[]>([]);

  useEffect(() => {
    adminServices
      .getLinksActive(username!)
      .then(({ success, links }) => {
        if (success) {
          console.log(allLinks);
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
          "Loading..."
        ) : (
          <>
            {isFoundUser ? (
              <div>
                <h1>User Profile</h1>
                <p>Username: {username}</p>

                {
                  <>
                    {allLinks.map((link, index) => (
                      <a href={link.url} hrefLang="_blank" key={index}>
                        {link.name}
                      </a>
                    ))}
                  </>
                }
              </div>
            ) : (
              <PageNotFound/>
            )}
          </>
        )}
      </>
    </MainLayout>
  );
};

export default UserProfile;
