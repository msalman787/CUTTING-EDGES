import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';

const AboutUsScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Welcome to Cutting Edges</Text>
      <Text style={styles.section}>Our Mission</Text>
      <Text style={styles.description}>
        At Cutting Edges, our mission is to revolutionize the barber industry by
        providing a seamless online appointment booking experience for both
        barbers and customers. We strive to bridge the gap between their needs
        and offer a platform that's efficient, reliable, and user-friendly.
      </Text>

      <Text style={styles.section}>Barber Empowerment</Text>
      <Text style={styles.description}>
        We understand the challenges barbers face in managing their schedules.
        Cutting Edges offers a user-friendly platform that allows barbers to
        showcase their skills, manage appointments, and connect with their
        clients effortlessly, giving them more control over their time and
        business.
      </Text>

      <Text style={styles.section}>Customer Convenience</Text>
      <Text style={styles.description}>
        For customers, we provide a convenient way to discover skilled barbers,
        check their availability, and book appointments at their convenience.
        Cutting Edges eliminates the hassle of waiting in line for a haircut,
        allowing customers to schedule appointments on their terms.
      </Text>

      <Text style={styles.section}>Why Choose Cutting Edges?</Text>
      <Text style={[styles.description,{
          marginBottom:5
      }]}>
        - **Efficiency:** Streamlined appointment scheduling for both barbers
        and customers.
      </Text>
      <Text style={[styles.description,{
          marginBottom:5
      }]}>
        - **Quality:** Access to a network of talented barbers passionate about
        their craft.
      </Text>
      <Text style={[styles.description,{
          marginBottom:5
      }]}>
        - **Convenience:** Book appointments at your convenience without the
        hassle.
      </Text>

      <Text style={styles.section}>Get in Touch</Text>
      <Text style={styles.description}>
        Have questions or suggestions? Reach out to our team at
        support@cuttingedges.com and follow us on social media for updates,
        tips, and more.
      </Text>

      <Text style={styles.footer}>
        Join the Cutting Edges community today and experience the future of
        barber appointments!
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  section: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: '#555',
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
    textAlign: 'justify',
    color: '#333',
  },
  footer: {
    marginTop: 30,
    fontSize: 18,
    fontStyle: 'italic',
    textAlign: 'center',
    color: '#555',
  },
});

export default AboutUsScreen;
