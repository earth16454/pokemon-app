import React, { useState, useEffect } from "react";
import Card from "./Card";
import Pokeinfo from "./Pokeinfo";
import axios from "axios";

const Main = () => {
  const [pokeData, setPokeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon/");
  const [nextUrl, setNextUrl] = useState();
  const [prevUrl, setPrevUrl] = useState();
  const [pokeDex, setPokeDex] = useState();

  const pokeFun = async () => {
    setLoading(true);
    const res = await axios.get(url);
    setNextUrl(res.data.next);
    setPrevUrl(res.data.previous);
    getPokemon(res.data.results);
    setLoading(false);
  };
  const getPokemon = async (res) => {
    res.map(async (item) => {
      const result = await axios.get(item.url);
      setPokeData((state) => {
        state = [...state, result.data];
        state.sort((a, b) => (a.id > b.id ? 1 : -1));
        return state;
      });
    });
  };
  useEffect(() => {
    pokeFun();
  }, [url]);
  return (
    <>
      {
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="table-resonsive">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>รูป</th>
                      <th>ชื่อ</th>
                      <th>ธาตุ</th>
                    </tr>
                  </thead>
                  <tbody>
                    <Card pokemon={pokeData} loading={loading} infoPokemon={(poke) => setPokeDex(poke)} />
                  </tbody>
                </table>
              </div>

              <div className="btn-group">
                {prevUrl && (
                  <button className="btn btn-outline-primary"
                    onClick={() => {
                      setPokeData([]);
                      setUrl(prevUrl);
                    }}
                  >
                    Previous
                  </button>
                )}

                {nextUrl && (
                  <button className="btn btn-primary"
                    onClick={() => {
                      setPokeData([]);
                      setUrl(nextUrl);
                    }}
                  >
                    Next
                  </button>
                )}
              </div>
            </div>
            <div className="col-6">
              <Pokeinfo data={pokeDex} />
            </div>
          </div>
        </div>
      }
    </>
  );
};
export default Main;
