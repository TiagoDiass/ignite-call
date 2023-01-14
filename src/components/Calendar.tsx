import { CaretLeft, CaretRight } from 'phosphor-react';
import * as S from './Calendar.styles';

export function Calendar() {
  return (
    <S.CalendarContainer>
      <S.CalendarHeader>
        <S.CalendarTitle>
          Janeiro <span>2023</span>
        </S.CalendarTitle>

        <S.CalendarActions>
          <button>
            <CaretLeft />
          </button>

          <button>
            <CaretRight />
          </button>
        </S.CalendarActions>
      </S.CalendarHeader>

      <S.CalendarBody>
        <thead>
          <tr>
            <th>DOM.</th>
            <th>SEG.</th>
            <th>TER.</th>
            <th>QUA.</th>
            <th>QUI.</th>
            <th>SEX.</th>
            <th>SÁB.</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td>
              <S.CalendarDay>1</S.CalendarDay>
            </td>
            <td>
              <S.CalendarDay>2</S.CalendarDay>
            </td>
            <td>
              <S.CalendarDay>3</S.CalendarDay>
            </td>
            <td>
              <S.CalendarDay>4</S.CalendarDay>
            </td>
          </tr>
          <tr>
            <td>
              <S.CalendarDay>5</S.CalendarDay>
            </td>
            <td>
              <S.CalendarDay>6</S.CalendarDay>
            </td>
            <td>
              <S.CalendarDay>7</S.CalendarDay>
            </td>
            <td>
              <S.CalendarDay>8</S.CalendarDay>
            </td>
            <td>
              <S.CalendarDay>9</S.CalendarDay>
            </td>
            <td>
              <S.CalendarDay>10</S.CalendarDay>
            </td>
            <td>
              <S.CalendarDay>11</S.CalendarDay>
            </td>
          </tr>
          <tr>
            <td>
              <S.CalendarDay>12</S.CalendarDay>
            </td>
            <td>
              <S.CalendarDay>13</S.CalendarDay>
            </td>
            <td>
              <S.CalendarDay disabled>14</S.CalendarDay>
            </td>
            <td>
              <S.CalendarDay disabled>15</S.CalendarDay>
            </td>
            <td>
              <S.CalendarDay>16</S.CalendarDay>
            </td>
            <td>
              <S.CalendarDay disabled>17</S.CalendarDay>
            </td>
            <td>
              <S.CalendarDay>18</S.CalendarDay>
            </td>
          </tr>
        </tbody>
      </S.CalendarBody>
    </S.CalendarContainer>
  );
}
