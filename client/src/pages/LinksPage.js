import { useEffect, useState, useContext, useCallback } from "react";
import { AuthContext } from "../context/auth.context";
import { useHttp } from "../hooks/http.hook";
import { Loader } from "../components/Loader";
import { LinksList } from "../components/LinksList";

export const LinksPage = () => {
  const { token } = useContext(AuthContext);
  const [links, setLinks] = useState();
  const { request, loading } = useHttp();

  const fetchLinks = useCallback(async () => {
    try {
      const data = await request("/api/link/", "GET", null, {
        Authorization: `Bearer ${token}`,
      });

      setLinks(data);
    } catch (error) {}
  }, [token, request]);

  useEffect(() => {
    fetchLinks();
  }, [fetchLinks]);

  if (loading) {
    return <Loader />;
  }

  return <> {!loading && links && <LinksList links={links} />}</>;
};
