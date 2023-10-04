import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthLayout } from "../../layouts";
import { adminServices } from "../../services";
import { Link } from "../../types";

const UserProfile: React.FC = () => {
  const { username } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [allLinks, setAllLinks] = useState<Link[]>([]);

  useEffect(() => {
    adminServices
      .getLinksAll(username!)
      .then(({ success, links }) => {
        if (success) {
          console.log(allLinks);
          setAllLinks(links);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [username]);

  return (
    <>
      {isLoading ? (
        "Loading..."
      ) : (
        <AuthLayout>
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
        </AuthLayout>
      )}
    </>
  );
};

export default UserProfile;
