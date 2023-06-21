import {
    StatsList,
    StatsListItem,
    StatsFeedbackCounter,
  } from './Statistics.styled';
  import PropTypes from 'prop-types';
  
  export const Statistics = ({
    feedbackData,
    total,
    positiveFeedbackPercentage,
  }) => {
    return (
      <StatsList>
        {feedbackData.map(feedback => (
          <StatsListItem key={feedback[0]}>
            {feedback[0]}:{' '}
            <StatsFeedbackCounter>{feedback[1]}</StatsFeedbackCounter>
          </StatsListItem>
        ))}
        <StatsListItem>
          Total: <StatsFeedbackCounter>{total}</StatsFeedbackCounter>
        </StatsListItem>
        <StatsListItem>
          Positive feedback:{' '}
          <StatsFeedbackCounter>
            {positiveFeedbackPercentage}%
          </StatsFeedbackCounter>
        </StatsListItem>
      </StatsList>
    );
  };
  
  Statistics.propTypes = {
    feedbackData: PropTypes.array.isRequired,
    total: PropTypes.number.isRequired,
    positiveFeedbackPercentage: PropTypes.string.isRequired,
  };