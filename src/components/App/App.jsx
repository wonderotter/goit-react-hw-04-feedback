import { AppWrapper } from './App.styled';
import { FeedbackOptions } from 'components/FeedbackOptions/FeedbackOptions';
import { Statistics } from 'components/Statistics/Statistics';
import { useState } from 'react';
import { Section } from 'components/Section/Section';
import { Notification } from 'components/Notification/Notification';

export const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const feedbackData = {
    good,
    neutral,
    bad,
  };

  const onLeaveFeedback = event => {
    // Простий варіант, масштабується, але на нього свариться WebPack
    // const feedbackToUpdate = event.target.innerText;
    // eval(`set${feedbackToUpdate}`)(feedback => feedback + 1);

    // Складний варіант, який не масштабується

    const feedbackToUpdate = event.target.innerText.toLowerCase();

    switch (feedbackToUpdate) {
      case 'good':
        setGood(prevState => prevState + 1);
        break;
      case 'neutral':
        setNeutral(prevState => prevState + 1);
        break;
      case 'bad':
        setBad(prevState => prevState + 1);
        break;

      default:
        new Error(console.error());
        break;
    }
  };

  const countTotalFeedback = () => {
    return Object.values(feedbackData).reduce((total, value) => total + value);
  };

  const countPositiveFeedbackPercentage = () => {
    const total = countTotalFeedback();

    return ((good * 100) / total || 0).toFixed(0);
  };

  return (
    <AppWrapper>
      <Section
        title="Please leave your feedback below"
        children={
          <FeedbackOptions
            options={Object.keys(feedbackData)}
            onLeaveFeedback={onLeaveFeedback}
          />
        }
      />
      <Section
        title="Statistics"
        children={
          countTotalFeedback() ? (
            <Statistics
              feedbackData={Object.entries(feedbackData)}
              total={countTotalFeedback()}
              positiveFeedbackPercentage={countPositiveFeedbackPercentage()}
            />
          ) : (
            <Notification message="No feedback given" />
          )
        }
      />
    </AppWrapper>
  );
};