import Link from 'next/link';

import { useEffect, useState, useMemo } from 'react';

import { useRouter } from 'next/router';

import { useDispatch } from 'react-redux';
import { useSelector } from '../../store';

import { answerActions } from '../../store/answer';
import { AnswerType,SurveyRequestType } from '../../types/answerType';
import axios from 'axios';

import useAnswer from '../../hooks/useQuestion';

import styled from '@emotion/styled';
import { axiosInstance } from '../../lib/api';

interface style {
  back: string;
  color: string;
  size: string;
}
interface SelectProps {
  qusetionId: number;
  answerList: Array<string>;
  id: number;
}
const SelectOne: React.FC<SelectProps> = ({ qusetionId, answerList, id }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const questionTotal = useSelector(
    (state) => state.question.questionTotalCount,
  );
  
  
  const myAnswerList = useSelector(
    (state) => state.answer.answerList,
  );

  const [num, setNum] = useState<number>(0);
  const plus = useMemo(() => {
    if (id) {
      return id;
    }
  }, [id]);
  useEffect(() => {
    if (id) {
      setNum(Number(id) + 1);
    }
  }, [plus]);

  const arrayBack = (index: number) => {
    if (index === 0) {
      return '#FF7B30';
    } else {
      return '#F2F2F2';
    }
  };

  const arrayFont = (index: number) => {
    if (index === 0) {
      return '#FFFFFF';
    } else {
      return '#FF7B30';
    }
  };

  const fontSize = () => {
    // console.log(num);
    if (num === questionTotal + 1) {
      return '50px';
    } else {
      return '80px';
    }
  };
  const postOneApi = async(request:string)=>{
    const response = await axiosInstance.post(`/api/v1/surveys/results`,request);
      return response;
  }
  const postMultiApi = async(request:string)=>{
    const response = await axiosInstance.post(`/api/v1/surveys/results/list`,request);
      return response;
  }
  return (
    <Container>
      <Wrapper>
        <FoodDiv>
          {answerList &&
            answerList.map((answer: string, index: number) => (
              <FoodButton
                key={index}
                back={arrayBack(index)}
                color={arrayFont(index)}
                size={fontSize()}
                onClick={(event) => {
                  if (num === questionTotal + 1) {
                    //하나만 선택할 때
                    const request = { lat:"", lng:"", answerList: myAnswerList };
                    // console.log(request,"request");
                    const obj = JSON.stringify(request);
                    console.log(obj,"obj");
                    if(index===0){
                        const data = postOneApi(obj);
                        console.log(data);
                    }
                    //여러개 선택할 때
                    else{ 
                        const data = postMultiApi(obj);
                    }
                    router.push(`/result`);
                  } else {
                    if(index===0){
                      let result: AnswerType = {questionId: qusetionId, answer: ["YES"]}
                      let curAnswerList =  [...myAnswerList];
                      curAnswerList[qusetionId-1] = result;
                      console.log(myAnswerList,"list")
                      dispatch(answerActions.setAnswer({ lat:"", lng:"", answerList: curAnswerList }))
                    }else{
                      console.log(myAnswerList,"list")
                      dispatch(answerActions.setAnswer({ lat:"", lng:"", answerList: myAnswerList }))
                    }
                    router.push(`/survey/${num}`);
                  }
                }}
              >
                {answer}
              </FoodButton>
            ))}
        </FoodDiv>
      </Wrapper>
    </Container>
  );
};

const Container = styled.div``;

const Wrapper = styled.div``;

const FoodDiv = styled.div`
  align-items: center;
  margin-left: 5%;
  margin-right: 5%;
  margin-top: 2vh;
`;

const FoodButton = styled.div<style>`
  background: ${(props) => props.back};
  border-radius: 15px;
  width: 100%;
  padding: 13% 0% 13% 0;
  // float: left;
  // margin-left: 3vw;
  margin-top: 4vh;
  text-align: center;
  font-style: normal;
  font-weight: 700;
  font-size: ${(props) => props.size};
  color: ${(props) => props.color};
  word-break: keep-all;
`;

const NextDiv = styled.div`
  align-items: center;
`;

const NextButton = styled.div``;

export default SelectOne;
