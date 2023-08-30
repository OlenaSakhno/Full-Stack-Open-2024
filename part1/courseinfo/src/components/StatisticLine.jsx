export const StatisticLine = (props) => {
  const { text, value, percents } = props;
  return (
    <tr>
      <td>
        <b> {text}</b>
      </td>
      <td>
        {value} {percents}
      </td>
      <td></td>
    </tr>
  );
};
