import cn from 'classnames';
import { useState, FormEvent, ChangeEvent } from 'react';
import './login-form.css';
import { useDispatch, useSelector } from 'react-redux';
import PacmanLoader from 'react-spinners/ClipLoader';
import { AuthData } from '../../types/auth-data';
import { loginAction } from '../../store/user-process/api-action';
import { getLoginLoading } from '../../store/user-process/selectors';

const formField = {
  email: 'E-mail',
  password: 'Password',
};

type InputProps = {
  value: string;
  error: boolean;
  regex: RegExp;
  touched: boolean;
  errorText : string;
}

type FormStateProps = { [key: string]: InputProps};

function LoginForm(): JSX.Element {

  const loginLoading = useSelector(getLoginLoading);

  const dispatch = useDispatch();

  const onSubmit = (authData: AuthData) => {
    dispatch(loginAction(authData));
  };

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
    setFormState({
      ...formState,
      [name]: {
        ...formState[name],
        value: value,
        error: !isFieldValid,
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

export default LoginForm;
