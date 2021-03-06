import { useEffect, useState, useContext, useCallback } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { useHttp } from "../hooks/http.hook";

import { Loader } from "../components/Loader";
import { LinkCard } from "../components/LinkCard";

export const DetailPage = () => {
  const { token } = useContext(AuthContext);
  const [link, setLink] = useState();
  const linkId = useParams().id;
  const { request, loading } = useHttp();

  const getLink = useCallback(async () => {
    const fetched = await request(`/api/link/${linkId}`, "GET", null, {
      Authorization: `Bearer ${token}`,
    });

    setLink(fetched);
  }, [token, linkId, request]);

  useEffect(() => {
    getLink();
  }, [getLink]);

  if (loading) {
    return <Loader />;
  }

  return <>{!loading && link && <LinkCard link={link} />}</>;
};
