import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock } from 'lucide-react';
import { useAuth } from '../../../hooks/useAuth';
import Input from '../../../components/common/Input';
import Button from '../../../components/common/Button';
import { ROUTES } from '../../../utils/routes';
import { isValidEmail } from '../../../utils/validators';

export const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [emailError, setEmailError] = useState('');
  const [pwdError, setPwdError] = useState('');
  const [formError, setFormError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmailError('');
    setPwdError('');
    setFormError('');

    let hasError = false;
    if (!isValidEmail(email)) {
      setEmailError('Please enter a valid email address');
      hasError = true;
    }
    if (!password) {
      setPwdError('Password is required');
      hasError = true;
    }

    if (hasError) return;

    try {
      setLoading(true);
      await login(email, password);
      navigate(ROUTES.DASHBOARD);
    } catch (err) {
      setFormError('Invalid email or password combination.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      {formError && <div style={styles.alert}>{formError}</div>}

      <Input
        label="Email Address"
        placeholder="you@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={emailError}
        icon={<Mail size={16} />}
        required
      />

      <Input
        label="Password"
        type="password"
        placeholder="••••••••"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={pwdError}
        icon={<Lock size={16} />}
        required
      />

      <div style={styles.forgotContainer}>
        <Link to={ROUTES.FORGOT_PASSWORD} style={styles.forgotLink}>
          Forgot password?
        </Link>
      </div>

      <Button type="submit" loading={loading} style={{ width: '100%' }}>
        Sign In
      </Button>

      <div style={styles.footer}>
        Don't have an account?{' '}
        <Link to={ROUTES.SIGNUP} style={styles.signupLink}>
          Create one now
        </Link>
      </div>
    </form>
  );
};

const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  forgotContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: '-4px',
  },
  forgotLink: {
    fontSize: '13px',
    fontWeight: 500,
    color: 'var(--color-primary)',
  },
  footer: {
    textAlign: 'center',
    fontSize: '13px',
    color: 'var(--text-secondary)',
    marginTop: '12px',
  },
  signupLink: {
    fontWeight: 600,
    color: 'var(--color-primary)',
  },
  alert: {
    backgroundColor: 'var(--color-danger-light)',
    color: 'var(--color-danger)',
    padding: '12px 16px',
    borderRadius: 'var(--radius-sm)',
    fontSize: '13px',
    fontWeight: 500,
    border: '1px solid rgba(239, 68, 68, 0.2)',
  },
};

export default LoginPage;
