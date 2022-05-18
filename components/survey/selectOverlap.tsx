import Link from 'next/link';

import { useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import { useSelector } from '../../store';

import styled from '@emotion/styled';

interface SelectProps {
  qusetionId: number;
  answerList: Array<string>;
  id: number;
}
interface style {
  float: string;
}
const SelectOverlap: React.FC<SelectProps> = ({
  qusetionId,
  answerList,
  id,
}) => {
  const router = useRouter();
  const questionTotal = useSelector(
    (state) => state.question.questionTotalCount,
  );
  const clicked: Array<boolean> = new Array(questionTotal).fill(false);
  const [colorList, setColorList] = useState<boolean[]>(clicked);

  const [num, setNum] = useState<number>(0);

  useEffect(() => {
    if (id) {
      setNum(id++);
    }
  }, []);

  // css 항목 왼쪽 오른쪽 끝 배치
  const floatFunc = (i: number) => {
    if (i % 2 === 0) {
      return 'left';
    } else {
      return 'right';
    }
  };
  // 클릭 여부 판단
  const handelClicked = (i: number) => {
    console.log(clicked);
    let copy = [...colorList];
    copy[i] = !copy[i];
    setColorList(copy);
    console.log(clicked, colorList);
  };

  const isClicked = (i: number) => {
    return clicked[i];
  };
  return (
    <Container>
      <Wrapper>
        <FoodDiv>
          {answerList &&
            answerList.map((answer: string, index: number) => (
              <div
                key={index}
                onClick={(event) => {
                  handelClicked(index);
                  console.log(index, 'index');
                  console.log(isClicked(index));
                }}
              >
                {colorList[index] ? (
                  <FoodButtonTrue
                    className="button"
                    float={floatFunc(index)}
                  >
                    {answer}
                  </FoodButtonTrue>
                ) : (
                  <FoodButtonFalse
                    className="button"
                    float={floatFunc(index)}
                  >
                    {answer}
                  </FoodButtonFalse>
                )}
              </div>
            ))}
          <NextButton
            onClick={(event) => {
              router.push(`/survey/${num}`);
            }}
          >
            다음
          </NextButton>
        </FoodDiv>
      </Wrapper>
    </Container>
  );
};

const Container = styled.div``;

const Wrapper = styled.div``;

const FoodDiv = styled.div`
  margin-left: 5%;
  margin-right: 5%;
  margin-top: 2vh;
`;

const FoodButtonTrue = styled.div<style>`
  background: #ff7b30;
  color: #ffffff;
  border-radius: 15px;
  width: 45%;
  padding: 5% 0% 5% 0;
  float: ${(props) => props.float};
  margin-bottom: 4vh;
  text-align: center;
  cursor: pointer;
  font-style: normal;
  font-weight: 700;
  font-size: 25px;
`;
const FoodButtonFalse = styled.div<style>`
  background: #f2f2f2;
  color: #ff7b30;
  border-radius: 15px;
  width: 45%;
  padding: 5% 0% 5% 0;
  float: ${(props) => props.float};
  margin-bottom: 4vh;
  text-align: center;
  cursor: pointer;
  font-style: normal;
  font-weight: 700;
  font-size: 25px;
`;

const NextButton = styled.div`
  cursor: pointer;
  float: left;
  align-self: center;
  text-align: center;
  border-radius: 15px;
  width: 100%;
  padding: 5% 0% 5% 0;

  font-style: normal;
  font-weight: 700;
  font-size: 25px;
  color: #ffffff;
  background: #ff7b30;
`;

export default SelectOverlap;
