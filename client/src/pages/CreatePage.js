import { useContext, useState } from "react";
import { AuthContext } from "../context/auth.context";
import { useHttp } from "../hooks/http.hook";
import { useHistory } from "react-router-dom";

export const CreatePage = () => {
  const history = useHistory();
  const [link, setLink] = useState();
  const { request } = useHttp();
  const auth = useContext(AuthContext);

  const pressHandler = async (event) => {
    if (event.key === "Enter") {
      try {
        const data = await request(
          "/api/link/generate",
          "POST",
          {
            from: link,
          },
          { Authorization: `Bearer ${auth.token}` }
        );

        history.push(`/detail/${data.link._id}`);
      } catch (error) {}
    }
  };

  return (
    <div className="row">
      <div className="col s8 offset-s2" style={{ paddingTop: "2rem" }}>
        <div class="input-field">
          <input
            placeholder="Вставьте ссылку"
            id="link"
            type="text"
            onChange={(event) => setLink(event.target.value)}
            onKeyPress={pressHandler}
          />

          <label htmlFor="link">Введите ссылку:</label>
        </div>
      </div>
    </div>
  );
};
