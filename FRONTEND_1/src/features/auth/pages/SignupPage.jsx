import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, User, UserCheck } from 'lucide-react';
import { useAuth } from '../../../hooks/useAuth';
import Input from '../../../components/common/Input';
import Select from '../../../components/common/Select';
import Button from '../../../components/common/Button';
import { ROUTES } from '../../../utils/routes';
import { ROLES } from '../../../utils/constants';
import { isValidEmail, isValidPassword } from '../../../utils/validators';

export const SignupPage = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState(ROLES.OPERATOR);

  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [pwdError, setPwdError] = useState('');
  const [loading, setLoading] = useState(false);

  const roleOptions = [
    { value: ROLES.OPERATOR, label: "Operator" },
    { value: ROLES.VIEWER, label: "Viewer" },
    { value: ROLES.ADMIN, label: "Administrator" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setNameError('');
    setEmailError('');
    setPwdError('');

    let hasError = false;
    if (!name) {
      setNameError('Full name is required');
      hasError = true;
    }
    if (!isValidEmail(email)) {
      setEmailError('Please enter a valid email address');
      hasError = true;
    }
    if (!isValidPassword(password)) {
      setPwdError('Password must be at least 6 characters');
      hasError = true;
    }

    if (hasError) return;

    try {
      setLoading(true);
      await signup(email, password, name, role);
      navigate(ROUTES.DASHBOARD);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <Input
        label="Full Name"
        placeholder="Sarah Connor"
        value={name}
        onChange={(e) => setName(e.target.value)}
        error={nameError}
        icon={<User size={16} />}
        required
      />

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
        placeholder="Min 6 characters"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={pwdError}
        icon={<Lock size={16} />}
        required
      />

      <Select
        label="Workplace Role"
        placeholder="Select your operational role"
        options={roleOptions}
        value={role}
        onChange={(e) => setRole(e.target.value)}
        required
      />

      <Button type="submit" loading={loading} style={{ width: '100%', marginTop: '8px' }}>
        Create Account
      </Button>

      <div style={styles.footer}>
        Already have an account?{' '}
        <Link to={ROUTES.LOGIN} style={styles.loginLink}>
          Sign in
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
  footer: {
    textAlign: 'center',
    fontSize: '13px',
    color: 'var(--text-secondary)',
    marginTop: '12px',
  },
  loginLink: {
    fontWeight: 600,
    color: 'var(--color-primary)',
  },
};

export default SignupPage;
