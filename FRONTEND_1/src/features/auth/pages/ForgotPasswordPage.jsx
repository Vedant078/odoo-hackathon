import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, ArrowLeft } from 'lucide-react';
import { NotificationContext } from '../../../app/providers/NotificationProvider';
import Input from '../../../components/common/Input';
import Button from '../../../components/common/Button';
import { ROUTES } from '../../../utils/routes';
import { isValidEmail } from '../../../utils/validators';

export const ForgotPasswordPage = () => {
  const { showSuccess } = useContext(NotificationContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmailError('');

    if (!isValidEmail(email)) {
      setEmailError('Please enter a valid email address');
      return;
    }

    try {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 800));
      showSuccess(`Password reset instructions sent to ${email}`);
      navigate(ROUTES.LOGIN);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <p style={styles.instructions}>
        Enter your email address and we'll send you instructions to reset your password.
      </p>

      <Input
        label="Email Address"
        placeholder="you@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={emailError}
        icon={<Mail size={16} />}
        required
      />

      <Button type="submit" loading={loading} style={{ width: '100%', marginTop: '8px' }}>
        Send Reset Link
      </Button>

      <div style={styles.footer}>
        <Link to={ROUTES.LOGIN} style={styles.backLink}>
          <ArrowLeft size={16} style={{ marginRight: '6px' }} />
          Back to Login
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
  instructions: {
    fontSize: '14px',
    color: 'var(--text-secondary)',
    lineHeight: '1.5',
    textAlign: 'center',
    marginBottom: '8px',
  },
  footer: {
    textAlign: 'center',
    marginTop: '12px',
  },
  backLink: {
    display: 'inline-flex',
    alignItems: 'center',
    fontSize: '13px',
    fontWeight: 600,
    color: 'var(--text-secondary)',
  },
};

export default ForgotPasswordPage;
