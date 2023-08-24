import {Alert, Linking, Share, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {
  HeaderWithSearchInput,
  LargeButton,
  RewardCards,
} from '../../../components';
import {Colors, Fonts, Images} from '../../../constants';
import LinearGradient from 'react-native-linear-gradient';
import {horizontalScale, verticalScale} from '../../../utils/Dimentions';
import Swiper from 'react-native-deck-swiper';

const WinRewards = ({navigation}: any) => {
  const handleGoback = () => {
    navigation.goBack();
  };

  const handleRedirect = () => {
    let card_data = {
      qrcodeValue: 'http://zetsol.co',
      description:
        'on winning a NowPosh t-shirt! Show this message at any nearby store. Claim your prize and enjoy your new t-shirt!',
    };
    navigation.navigate('RadeemRewardScreen', {data: card_data});
  };

  const cardArray = [
    {
      image: Images.Share,
      description:
        'Share our post 10 times on social media and win a Nowposh Cap!',
      statusValue: 0.2,
      footerText: '05/10 Shares',
      action: 'Share now',
      status: '',
    },
    {
      image: Images.InviteUser,
      description: 'Invite 10 new users in 50 days and win a Nowposh t-shirt!',
      statusValue: 0.5,
      footerText: '02/10 Shares',
      action: 'Invite now',
    },
    {
      image: Images.Share,
      description:
        'Share our post 10 times on social media and win a Nowposh Cap!',
      statusValue: 0.8,
      footerText: '9/10 Shares',
      action: 'Share now',
      status: '',
    },
    {
      image: Images.InviteUser,
      description: 'Invite 10 new users in 50 days and win a Nowposh t-shirt!',
      statusValue: 1,
      footerText: '10/10 Shares',
      action: 'Radeem Reward',
      status: 'Completed',
    },
    {
      image: Images.InviteUser,
      description: 'Invite 10 new users in 50 days and win a Nowposh t-shirt!',
      statusValue: 1,
      footerText: '10/10 Shares',
      action: 'Radeem Reward',
      status: 'Already redeemed',
    },
  ];
  const [data, setData] = useState(cardArray);
  const onShareLink = async () => {
    const link = 'https://www.example.com'; // Replace with the link you want to share
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      link,
    )}`;
    Linking.openURL(url)
      .then(() => console.log('Link shared to Facebook successfully!'))
      .catch(error => console.error('Error while sharing to Facebook:', error));
  };
  const handleSwiped = (cardIndex: number) => {
    const swipedCard = data[cardIndex];
    const newData = [...data];
    newData.push(swipedCard);
    setData(newData);
  };

  return (
    <LinearGradient
      style={styles.container}
      colors={['#467BE9', '#467BE9', '#AC6FEC']}>
      <View style={styles.header}>
        <HeaderWithSearchInput
          title="Win Rewards"
          titleColor={true}
          onBackBtnPress={handleGoback}
          titleStyle={30}
        />
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Start promoting on social media now</Text>
        <View style={{flex: 8, marginLeft: -10}}>
          <Swiper
            cards={data}
            renderCard={item => (
              <RewardCards
                handleRedirect={handleRedirect}
                onLinkShare={onShareLink}
                card={item}
              />
            )}
            onSwiped={handleSwiped}
            cardIndex={0}
            stackSize={data.length}
            swipeAnimationDuration={500}
            verticalSwipe={false}
            backgroundColor={'transparent'}
          />
        </View>
      </View>
    </LinearGradient>
  );
};

export default WinRewards;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  title: {
    flexWrap: 'wrap',
    fontFamily: Fonts.POPPINS_SEMI_BOLD,
    color: Colors.DEFAULT_WHITE,
    fontSize: 20,
  },
  contentContainer: {
    paddingVertical: verticalScale(5),
    paddingHorizontal: horizontalScale(10),
    flexDirection: 'column',
    justifyContent: 'space-between',
    flexGrow: 1, // To make the contentContainer take up available space.
  },
});
