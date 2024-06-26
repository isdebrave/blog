import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import { EdgesType } from "types";
import CardItem from "./CardItem";

type CardListType = {
  selectedTag: string;
  edges: EdgesType[];
};

const Grid = styled.div`
  display: grid;
  width: 768px;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin: 0 auto;
  transition: all 0.3s ease-in-out;

  @media (max-width: 900px) {
    width: 100%;
    padding: 0 100px;
    grid-template-columns: 1fr;
  }

  @media (max-width: 600px) {
    padding: 0 20px;
  }
`;

const CardList: React.FC<CardListType> = (props) => {
  const { selectedTag, edges } = props;

  const [list, setList] = useState<EdgesType[]>([]);

  useEffect(() => {
    let selectedList = edges;

    if (selectedTag != "All") {
      selectedList = edges.filter((edge) => {
        return edge.node.frontmatter.categories.includes(selectedTag);
      });
    }

    setList(selectedList);
  }, [selectedTag, edges]);

  return (
    <Grid>
      {list.map((item) => (
        <CardItem
          key={item.node.id}
          {...item.node.frontmatter}
          link={item.node.fields.slug}
        />
      ))}
    </Grid>
  );
};

export default CardList;
