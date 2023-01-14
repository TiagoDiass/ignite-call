import { useState } from 'react';
import { Calendar } from '../../../../components/Calendar';
import * as S from './CalendarStep.styles';

export function CalendarStep() {
  // const [] = useState()
  const hasUserSelectedAnyDay = true;

  return (
    <S.Wrapper isTimePickerOpen={hasUserSelectedAnyDay}>
      <Calendar />

      {hasUserSelectedAnyDay && (
        <S.TimePicker>
          <S.TimePickerHeader>
            terça-feira <span>20 de janeiro</span>
          </S.TimePickerHeader>

          <S.TimePickerList>
            <S.TimePickerItem>08:00h</S.TimePickerItem>
            <S.TimePickerItem>09:00h</S.TimePickerItem>
            <S.TimePickerItem disabled>10:00h</S.TimePickerItem>
            <S.TimePickerItem>11:00h</S.TimePickerItem>
            <S.TimePickerItem disabled>12:00h</S.TimePickerItem>
            <S.TimePickerItem>13:00h</S.TimePickerItem>
            <S.TimePickerItem>14:00h</S.TimePickerItem>
            <S.TimePickerItem>15:00h</S.TimePickerItem>
            <S.TimePickerItem>16:00h</S.TimePickerItem>
            <S.TimePickerItem>17:00h</S.TimePickerItem>
            <S.TimePickerItem>18:00h</S.TimePickerItem>
            <S.TimePickerItem>19:00h</S.TimePickerItem>
            <S.TimePickerItem>20:00h</S.TimePickerItem>
            <S.TimePickerItem>21:00h</S.TimePickerItem>
            <S.TimePickerItem>22:00h</S.TimePickerItem>
          </S.TimePickerList>
        </S.TimePicker>
      )}
    </S.Wrapper>
  );
}
