import cn from 'classnames';
import { useState, FormEvent, ChangeEvent } from 'react';
import './login-form.css';
import { connect, ConnectedProps } from 'react-redux';
import { State } from '../../types/state';
import PacmanLoader from 'react-spinners/ClipLoader';
import { AuthData } from '../../types/auth-data';
import { loginAction } from '../../store/api-action';
import { ThunkAppDispatch } from '../../types/action';

const formField = {
  email: 'E-mail',
  password: 'Password',
};

const mapStateToProps = ({ loginLoading }: State) => ({
  loginLoading,
});

const mapDispatchToProps = (dispatch: ThunkAppDispatch) => ({
  onSubmit(authData: AuthData) {
    dispatch(loginAction(authData));
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

function LoginForm({ loginLoading, onSubmit }: PropsFromRedux): JSX.Element {
  const [formState, setFormState] = useState({
    email: {
      value: '',
      error: false,
      tach: false,
    },
    password: {
      value: '',
      error: true,
      tach: false,
    },
  });
  const isDisabled =
    formState.password.error || !formState.email.tach || loginLoading;
  const handleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = target;
    const validPassword = /^(?=.*[0-9])(?=.*[a-z]).{3,}$/;
    setFormState({
      ...formState,
      [name]: {
        value: value,
        error: false,
        tach: true,
      },
    });

    if (name === Object.keys(formField)[1]) {
      !validPassword.test(value)
        ? setFormState({
          ...formState,
          [name]: {
            value: value,
            error: true,
            tach: true,
          },
        })
        : setFormState({
          ...formState,
          [name]: {
            value: value,
            error: false,
            tach: true,
          },
        });
    }

    if (name === Object.keys(formField)[0] && value === '') {
      setFormState({
        ...formState,
        [name]: {
          value: value,
          error: true,
          tach: false,
        },
      });
    }
  };
  return (
    <section className="login">
      <h1 className="login__title">Sign in</h1>
      <form
        className="login__form form"
        action="#"
        method="post"
        onSubmit={(evt: FormEvent<HTMLFormElement>) => {
          evt.preventDefault();
          onSubmit({
            email: formState.email.value,
            password: formState.password.value,
          });
        }}
      >
        {Object.entries(formField).map(([key, value]) => {
          const classInput = cn('login__input form__input', {
            error:
              key === 'password' &&
              formState.password.tach &&
              formState.password.error,
          });
          return (
            <div key={key} className="login__input-wrapper form__input-wrapper">
              <label className="visually-hidden">{value}</label>
              <input
                className={classInput}
                type={key}
                name={key}
                placeholder={value}
                onChange={handleChange}
              />
              {key === 'password' &&
              formState.password.error &&
              formState.password.tach ? (
                  <p className="textError">
                  Пароль должен содержать минимум 2 символа и цифру
                  </p>
                ) : (
                  ''
                )}
            </div>
          );
        })}
        <button
          className="login__submit form__submit button"
          type="submit"
          disabled={isDisabled}
        >
          {loginLoading ? <PacmanLoader size={20} /> : 'Sign in'}
        </button>
      </form>
    </section>
  );
}

export { LoginForm };
export default connector(LoginForm);
