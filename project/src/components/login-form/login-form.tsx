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

type InputProps = {
  value: string;
  error: boolean;
  regex: RegExp;
  touched: boolean;
  errorText : string;
}

type FormStateProps = { [key: string]: InputProps};
function LoginForm({ loginLoading, onSubmit }: PropsFromRedux): JSX.Element {
  const [formState, setFormState] = useState<FormStateProps>({
    email: {
      value: '',
      error: false,
      errorText: 'Введите корректный E-mail.',
      regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      touched: false,
    },
    password: {
      value: '',
      error: false,
      errorText: 'Пароль должен содержать минимум 2 символа и цифру.',
      regex:/^(?=.*[0-9])(?=.*[a-z]).{3,}$/,
      touched: false,
    },
  });

  const isDisabled = loginLoading || formState.email.error || formState.password.error || !formState.email.touched || !formState.password.touched;

  const handleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = target;
    const rule = formState[name].regex;
    const isFieldValid = rule.test(value);
    isFieldValid ?
      setFormState({
        ...formState,
        [name]: {
          ...formState[name],
          value: value,
          error: false,
          touched: true,
        },
      }) :
      setFormState({
        ...formState,
        [name]: {
          ...formState[name],
          value: value,
          error: true,
          touched: true,
        },
      });
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
            error: formState[key].error && formState[key].touched,
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
              { formState[key].error && formState[key].touched &&
              (
                <p className="textError">
                  {formState[key].errorText}
                </p>
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
