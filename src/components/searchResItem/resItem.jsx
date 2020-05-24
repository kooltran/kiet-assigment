import React, { useState, useCallback } from "react";
import styled from "styled-components";
import { Input } from "antd";
import { SaveOutlined } from "@ant-design/icons";
import { useAppContext } from "../../AppContext";
import { convertToLongDate } from "../../helper";

const StyledItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  border: 10px solid #333;
  width: 100%;
  box-sizing: border-box;
  padding: 10px;
`;

const StyledItemDesc = styled.p`
  font-size: 14px;
`;

const StyledItemTitle = styled.h3`
  margin-bottom: 10px;
  color: #40a9ff;
`;

const StyledItemDate = styled.p`
  color: #a6a832;
`;

const StyledButton = styled.button`
  line-height: 1.5715;
  position: relative;
  display: inline-block;
  font-weight: 400;
  white-space: nowrap;
  text-align: center;
  background-image: none;
  border: 1px solid transparent;
  box-shadow: 0 2px 0 rgba(0, 0, 0, 0.015);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  height: 32px;
  padding: 4px 15px;
  font-size: 14px;
  border-radius: 2px;
  color: rgba(0, 0, 0, 0.65);
  background-color: #fff;
  border-color: #d9d9d9;

  &:hover {
    color: #fff;
    background-color: #40a9ff;
    border-color: #40a9ff;
  }
`;

const StyledItemContainer = styled.div``;

const StyledActionButton = styled.div`
  margin-top: 15px;
`;

const StyledEditContainer = styled.div`
  display: flex;
`;

const SearchResItem = ({ item = {} }) => {
  const [isEdit, toggleEdit] = useState(false);

  const [, setAction] = useAppContext();
  const [editVal, setEditVal] = useState(item.title);

  const setActionButton = useCallback(
    data => setAction(data, "SET_BUTTON_ACTION"),
    [setAction]
  );
  const setActionEdit = data => setAction(data, "SET_EDIT");

  const handleClickButtonAction = useCallback(
    choosenItem => e => {
      const { value } = e.target;
      setActionButton({ ...choosenItem, actionType: value });
    },
    [setActionButton]
  );

  const handleInputChange = e => {
    const { value } = e.target;
    setEditVal(value);
  };

  const handlesubmitEditChange = () => {
    setActionEdit({ ...item, title: editVal });
    toggleEdit(!isEdit);
  };

  const handleEdit = useCallback(() => toggleEdit(!isEdit), []);

  const handleSubmitKeydown = e => {
    if (e.key === "Enter") {
      handlesubmitEditChange();
    }
  };

  return (
    <StyledItemWrapper>
      <StyledItemContainer>
        <StyledItemTitle>
          {isEdit ? (
            <StyledEditContainer>
              <Input
                value={editVal}
                onChange={handleInputChange}
                onKeyDown={handleSubmitKeydown}
              />
              <StyledButton
                type="primary"
                icon={<SaveOutlined />}
                onClick={handlesubmitEditChange}
              >
                save
              </StyledButton>
            </StyledEditContainer>
          ) : (
            editVal
          )}
        </StyledItemTitle>
        <StyledItemDesc>{item.description}</StyledItemDesc>
        <StyledItemDate>
          {convertToLongDate(item.date_created).date}
        </StyledItemDate>
      </StyledItemContainer>
      <StyledActionButton>
        <StyledButton
          onClick={handleClickButtonAction(item)}
          value={item.action === "like" ? "unlike" : "like"}
        >
          {item.action === "like" ? "unlike" : "like"}
        </StyledButton>
        <StyledButton
          onClick={handleClickButtonAction(item)}
          value={item.action === "remove" ? "undo" : "remove"}
        >
          {item.action === "remove" ? "undo" : "remove"}
        </StyledButton>
        {!isEdit && (
          <StyledButton onClick={handleEdit} value="edit">
            edit
          </StyledButton>
        )}
      </StyledActionButton>
    </StyledItemWrapper>
  );
};

export default SearchResItem;
