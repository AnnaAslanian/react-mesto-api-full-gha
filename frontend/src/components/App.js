import React, { useState, useEffect } from "react"
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { api } from "../utils/Api"
import Header from "./Header"
import Footer from "./Footer"
import Main from "./Main"
import ImagePopup from "./ImagePopup"
import { CurrentUserContext } from "../contexts/CurrentUserContext"
import EditProfilePopup from "./EditProfilePopup"
import EditAvatarPopup from "./EditAvatarPopup"
import AddPlacePopup from "./AddPlacePopup"
import DeleteConfirmPopup from "./DeleteConfirmPopup"
import Login from "./Login"
import Register from "./Register"
import ProtectedRoute from "./ProtectedRoute"
import * as Auth from "../utils/Auth"
import InfoTooltip from "./InfoTooltip"


function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [renderLoading, setRenderLoading] = useState(false);
  const [isDeleteCardPopup, setDeleteCardPopup] = useState(false);
  const [isInfotooltipPopupOpen, setInfotooltipPopupOpen] = useState(false);
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate()

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
  };
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
  };
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
  };
  function handleCardClick(item) {
    setSelectedCard(item)
  };
  function handleDeleteCardClick(item) {
    setSelectedCard(item)
    setDeleteCardPopup(true)
  };

  useEffect(() => {
    if (loggedIn) {
      api
      .getInitialCards()
      .then((cards) => setCards(cards))
      .catch((err) => console.log(`Ошибка ${err}`))
}
}, [loggedIn]);

useEffect(() => {
  if (loggedIn) {
    api
      .getInitialUser()
      .then((userInfo) => setCurrentUser(userInfo))
      .catch((err) => console.log(`Ошибка ${err}`))
  }
}, [loggedIn]);

  function closeAllPopups() {
    const allPopupStates = [
      setIsEditProfilePopupOpen,
      setIsAddPlacePopupOpen,
      setIsEditAvatarPopupOpen,
      setDeleteCardPopup,
      setInfotooltipPopupOpen
    ]
    allPopupStates.forEach((state) => state(false))
    setSelectedCard(null)
  };

  function addCard(data) {
    setRenderLoading(true)
    api
      .getAddCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards])
        closeAllPopups()
      })
      .catch((err) => console.log(`Ошибка ${err}`))
      .finally(() => {
        setRenderLoading(false)
      })
  };

  function handleUpdateAvatar(link) {
    setRenderLoading(true)
    api
      .getEditAvatar(link)
      .then((item) => {
        setCurrentUser(item)
        closeAllPopups()
      })
      .catch((err) => console.log(`Ошибка ${err}`))
      .finally(() => {
        setRenderLoading(false)
      })
  };

  function handleUpdateUser(data) {
    setRenderLoading(true)
    api
      .getEditUser(data)
      .then((userInfo) => {
        setCurrentUser(userInfo)
        closeAllPopups()
      })
      .catch((err) => console.log(`Ошибка ${err}`))
      .finally(() => {
        setRenderLoading(false)
      })
  };

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => (i._id || i) === currentUser._id)
    console.log(isLiked)
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)))
      })
      .catch((err) => console.log(`Ошибка ${err}`))
  };

  function handleCardDelete(id) {
    api
      .deleteCards(id)
      .then(() => {
        setCards((state) => state.filter((card) => card._id !== id))
      })
      .catch((err) => console.log(`Ошибка ${err}`))
      .finally(() => {
        setRenderLoading(false)
      })
  };

  // function handleLoginTrueStatus() {
  //   setLoggedIn(true);
  // }

  const handleRegister = (email, password) => {
    setRenderLoading(true)
    Auth
      .register(email, password)
      .then(() => {
        setSuccess(true);
        setInfotooltipPopupOpen(true);
        navigate('/sign-in');
      })
      .catch((err) => {
        setSuccess(false);
        setInfotooltipPopupOpen(true);
        console.log(err);
      })
      .finally(() => {
        setRenderLoading(false)
      })
  }

  const handleLogin = (userInfo) => {
    // console.log(userInfo)
    setRenderLoading(true)
    Auth
      .authorization(userInfo)
      .then(() => {
        // if (data.token) localStorage.setItem("token", data.token);
        setLoggedIn(true);
        setUserEmail(userInfo.email);
        navigate('/');
      })
      .catch((err) => {
        setSuccess(false);
        setInfotooltipPopupOpen(true);
        console.log(err);
      })
      .finally(() => {
        setRenderLoading(false);
      })
  }

  const tokenCheck = () => {
    const token = localStorage.getItem("token");
    if (token) {
      Auth
        .tokenCheck(token)
        .then((res) => {
          setLoggedIn(true);
          console.log(res.email)
          setUserEmail(res.email);
          navigate("/");
        })
        .catch((err) => {
          console.log(err);
          navigate('/sign-in')
        })
    }
  }

  // useEffect(() => {
  //   tokenCheck();
  // }, [ loggedIn ]);

  // function onSignOut() {
  //   localStorage.removeItem("token");
  //   navigate('/sign-in')
  // }

  useEffect(() => {
    tokenCheck();
  }, [loggedIn]);

  function onSignOut() {
    setLoggedIn(false)
    localStorage.removeItem("token");
    navigate('/sign-in')
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="body">
        <div className="root">
          <Header userEmail={userEmail} onSignOut={onSignOut} />
          <Routes>
            <Route path="/sign-in" element={<Login onLogin={handleLogin} renderLoading={renderLoading ? "Вход..." : "Войти"} />} />
            <Route path="/sign-up" element={<Register onRegister={handleRegister} renderLoading={renderLoading ? "Регистрация..." : "Зарегистрироваться"} />} />
            <Route
              path="/"
              element={<ProtectedRoute
                onEditAvatar={handleEditAvatarClick}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
                handleDeleteCardClick={handleDeleteCardClick}
                cards={cards}
                loggedIn={loggedIn}
                element={Main}
              />}
            />
            <Route path="*" element={<Navigate to={loggedIn ? '/' : '/sign-in'} />} />
          </Routes>
          <Footer />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            renderLoading={renderLoading ? "Сохранение..." : "Сохранить"}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            renderLoading={renderLoading ? "Сохранение..." : "Сохранить"}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={addCard}
            renderLoading={renderLoading ? "Создание..." : "Создать"}
          />
          <DeleteConfirmPopup
            isOpen={isDeleteCardPopup}
            onClose={closeAllPopups}
            onCardDelete={handleCardDelete}
            renderLoading={renderLoading ? "Удаление..." : "Да"}
            card={selectedCard}
          />
          <InfoTooltip
            isOpen={isInfotooltipPopupOpen}
            onClose={closeAllPopups}
            success={success}
            tooltipText={success ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз."}
          />
          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        </div>
      </div>
    </CurrentUserContext.Provider>
  )
}

export default App