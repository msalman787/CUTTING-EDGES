import {
  Image,
  Modal,
  PermissionsAndroid,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {
  AnimatedInput,
  DynamicStatusBar,
  HeaderWithSearchInput,
  LargeButton,
  ValidationModel,
} from '../../../components';
import {Colors, Fonts, Images} from '../../../constants';
import {verticalScale} from '../../../utils/Dimentions';
import {Controller, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import ImagePicker from 'react-native-image-crop-picker';
import {packageInputSchema} from '../../../validations/Package';
import apiResponseGenerator from '../../../service/apiGenerator';
import {useDispatch} from 'react-redux';
import {showModal} from '../../../store/model/modelSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SelectList} from 'react-native-dropdown-select-list';
import axios from 'axios';
import {Checkbox} from 'react-native-paper';

const NewPackage = ({navigation}: any) => {
  const [showModel, setShowModal] = useState<boolean>(false);
  const [disabled, setDisabled] = useState(false);
  const dispatch = useDispatch();
  const [selected, setSelected] = useState('');
  const data = [
    {value: 'haircuts', key: 'Hair Cut / Beard'},
    {value: 'grooms', key: 'Groom'},
    {value: 'massage', key: 'Massage'},
    {value: 'faicials', key: 'Faicial'},
  ];
  const [state, setState] = useState({
    title: 'Sorry!',
    bgColor: '',
    image: Images.WrongIcon,
    description: 'You can only added upto 1 image.',
    buttonText: 'Ok',
    isValidate: false,
  });

  const [images, setImages]: any = useState();
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(packageInputSchema),
  });
  const [isDealYes, setIsDealYes] = useState(false);
  const [isDealNo, setIsDealNo] = useState(true);
  console.log(isDealYes);

  const handleIsDealYesChanger = () => {
    setIsDealYes(!isDealYes);
    setIsDealNo(false);
  };

  const handleIsDealNoChanger = () => {
    setIsDealNo(!isDealNo);
    setIsDealYes(false);
  };

  const handleCloseInput = () => {
    navigation.goBack();
  };

  const handleCaptureImage = () => {
    if (!images) {
      ImagePicker.openCamera({
        width: 300,
        height: 400,
        cropping: true,
      })
        .then(async (image: any) => {
          setShowModal(false);
          await setImages(image);
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      setState(prevState => ({
        ...prevState,
        isValidate: !prevState.isValidate,
      }));
      setShowModal(false);
    }
  };
  const requestGalleryPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'Permission to Access Gallery',
          message: 'Your app needs permission to access the gallery.',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        // Permission granted, you can now use the ImagePicker
        choosePhotoFromLibrary();
      } else {
        // Permission denied, handle it gracefully (e.g., show a message)
        console.log('Gallery permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const choosePhotoFromLibrary = () => {
    if (!images) {
      ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
        includeBase64: false,
      })
        .then(async (image: any) => {
          setShowModal(false);
          await setImages(image);
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      setState(prevState => ({
        ...prevState,
        isValidate: !prevState.isValidate,
      }));
      setShowModal(false);
    }
  };

  const handleHideModal = () => {
    setState(prevState => ({
      ...prevState,
      isValidate: !prevState.isValidate,
    }));
  };

  const onPageRedirect = async () => {
    await navigation.goBack();
  };
  const getAdminId = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('customer');
      if (jsonValue) {
        return jsonValue;
      }
      return null;
    } catch (error) {
      console.error('Error fetching token:', error);
      return null;
    }
  };

  const HandleNewPackage = async (data: any) => {
    data.admin_id = await getAdminId();
    data.image = images?.path ? images?.path : '';
    data.type = selected;
    try {
      const response = await apiResponseGenerator({
        url: 'api/addpricing',
        method: 'post',
        body: data,
      });
      if (response.success) {
        return handleCloseInput();
      }
    } catch (error: any) {
      dispatch(showModal({description: error.message}));
    }
  };
  const uploadImageToAPI = async (data: any) => {
    const formData = new FormData();
    formData.append('image', {
      uri: images?.path,
      type: 'image/jpeg',
      name: 'image.jpg',
    });
    formData.append('Plan_title', data.Plan_title);
    formData.append('Plan_tag_line', data.Plan_tag_line);
    formData.append('Plan_price', data.Plan_price);
    formData.append('Plan_description', data.Plan_description);
    formData.append('location', data.location);
    formData.append('google_map_link', data.google_map_link);
    formData.append('admin_id', await getAdminId());
    formData.append('type', selected);
    formData.append('Plan_dealprice', data.Plan_dealprice);
    formData.append('deal', isDealYes);
    console.log(formData);
    setDisabled(true);
    await axios
      .post('https://api.thesafetytags.com/api/addpricing', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response: any) => {
        console.log('Image upload success:', response.data);
        handleCloseInput();
        setDisabled(false);

        return;
      })
      .catch(error => {
        setDisabled(false);

        console.error('Image upload error:', error);
      });
  };
  return (
    <ScrollView style={styles.container}>
      {/* Validation Model */}
      <ValidationModel
        isVisible={state.isValidate}
        modalImage={state.image}
        title={state.title}
        bgColor={state.bgColor}
        description={state.description}
        onClose={handleHideModal}
        buttonText={state.buttonText}
        onPageRedirect={onPageRedirect}
      />
      {/* Image Picker Model */}
      <Modal animationType="fade" transparent={true} visible={showModel}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.modelButtons}>
              <LargeButton
                onPress={handleCaptureImage}
                colorChanger={true}
                text={'Take Photo'}
              />
            </View>
            <View style={[styles.modelButtons, {paddingVertical: 70}]}>
              <LargeButton
                onPress={choosePhotoFromLibrary}
                colorChanger={true}
                text={'Upload Photo'}
              />
            </View>
            <View style={styles.modelButtons}>
              <LargeButton
                onPress={() => {
                  setShowModal(false);
                }}
                text={'Cancel'}
              />
            </View>
          </View>
        </View>
      </Modal>

      <DynamicStatusBar />

      <View style={styles.header}>
        <HeaderWithSearchInput
          title="New Package"
          onBackBtnPress={handleCloseInput}
          titleStyle={30}
        />
      </View>
      <View style={styles.subContainer}>
        <View
          style={{
            paddingHorizontal: 10,
          }}>
          <SelectList
            placeholder="select a package type"
            setSelected={(val: any) => {
              setSelected(val);
            }}
            data={data}
            save="value"
          />
        </View>
        <View style={styles.input}>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <AnimatedInput
                label="Title"
                leftIcon={'format-title'}
                keyboardType={'default'}
                value={value}
                onChangeText={onChange}
                errorMsg={errors.Plan_title?.message}
              />
            )}
            name="Plan_title"
            defaultValue=""
          />
        </View>
        <View style={styles.input}>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <AnimatedInput
                label="Description"
                leftIcon={'sticker-text'}
                keyboardType={'default'}
                value={value}
                onChangeText={onChange}
                errorMsg={errors.Plan_description?.message}
              />
            )}
            name="Plan_description"
            defaultValue=""
          />
        </View>
        <View style={styles.input}>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <AnimatedInput
                leftIcon={'hand-coin'}
                label="Price"
                keyboardType={'default'}
                value={value}
                onChangeText={onChange}
                errorMsg={errors.Plan_price?.message}
              />
            )}
            name="Plan_price"
            defaultValue=""
          />
        </View>
        <View style={styles.input}>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <AnimatedInput
                leftIcon={'hand-coin'}
                label="Deal Price"
                keyboardType={'default'}
                value={value}
                onChangeText={onChange}
                errorMsg={errors.Plan_dealprice?.message}
              />
            )}
            name="Plan_dealprice"
            defaultValue=""
          />
        </View>

        <View style={styles.input}>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <AnimatedInput
                label="Map location"
                leftIcon={'home-map-marker'}
                keyboardType={'default'}
                value={value}
                onChangeText={onChange}
                errorMsg={errors.google_map_link?.message}
              />
            )}
            name="google_map_link"
            defaultValue=""
          />
        </View>
        <View style={styles.input}>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <AnimatedInput
                label="Location"
                leftIcon={'home'}
                keyboardType={'default'}
                value={value}
                onChangeText={onChange}
                errorMsg={errors.location?.message}
              />
            )}
            name="location"
            defaultValue=""
          />
        </View>

        <View style={styles.input}>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <AnimatedInput
                label="Tag Line"
                leftIcon={'tag'}
                keyboardType={'default'}
                value={value}
                onChangeText={onChange}
                errorMsg={errors.Plan_tag_line?.message}
              />
            )}
            name="Plan_tag_line"
            defaultValue=""
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 20,
            justifyContent: 'space-around',
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text>Deal</Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Checkbox
              color={Colors.DEFAULT_BLACK}
              status={isDealYes ? 'checked' : 'unchecked'}
              onPress={handleIsDealYesChanger}
            />
            <Text>Yes</Text>
          </View>

          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Checkbox
              color={Colors.DEFAULT_BLACK}
              status={isDealNo ? 'checked' : 'unchecked'}
              onPress={handleIsDealNoChanger}
            />
            <Text>No</Text>
          </View>
        </View>

        <View style={styles.dashedBorder}>
          <TouchableOpacity
            onPress={() => {
              setShowModal(true);
            }}
            style={{
              borderRadius: 10,
              alignItems: 'center',
              padding: 10,
            }}>
            <Text style={styles.text}>Upload Package image</Text>
          </TouchableOpacity>
        </View>
        <View style={{marginHorizontal: 10}}>
          <LargeButton
            disabled={disabled}
            onPress={handleSubmit(uploadImageToAPI)}
            text={'Submit'}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default NewPackage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.DEFAULT_WHITE,
  },
  header: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  subContainer: {
    paddingVertical: verticalScale(5),
    paddingHorizontal: verticalScale(10),
  },
  input: {
    paddingHorizontal: 10,
    marginBottom: 10,
    width: '100%',
  },
  dashedBorder: {
    borderRadius: 7,
    borderWidth: 1,
    borderColor: Colors.LIGHT_GRAY,
    marginVertical: 30,
    margin: 10,
  },
  text: {
    fontFamily: Fonts.POPPINS_REGULAR,
    color: Colors.DEFAULT_BLACK,
    fontSize: 16,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    opacity: 1,
  },
  modalView: {
    margin: 20,
    padding: 30,
    borderRadius: 20,
    backgroundColor: Colors.BG_COLOR,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '90%',
    height: '35%',
    textAlignVertical: 'center',
  },
  modelButtons: {
    marginHorizontal: 10,
    width: '100%',
  },
  imageContainer: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    paddingHorizontal: 10,
  },
  image: {
    width: 50,
    height: 50,
    marginBottom: 10,
    borderRadius: 10,
  },
  selectedImage: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    width: '75%',
    marginLeft: 10,
    marginTop: 5,
  },
});
