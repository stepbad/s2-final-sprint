import React, { useState } from 'react';

const Login = ({ onLogin }) => {
  const [isSignup, setIsSignup] = useState(false);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [signupData, setSignupData] = useState({
    fname: '',
    lname: '',
    email: '',
    password: '',
    creditCard: '',
    expiry: '',
    cvv: '',
    box: '',
    street: '',
    city: '',
    province: '',
  });
  const [errors, setErrors] = useState({});

  const provinces = ['NL', 'ON', 'BC', 'QC', 'AB', 'NS', 'NB', 'PE', 'MB', 'NT', 'SK', 'YT',];

  const validateSignup = () => {
    const newErrors = {};

    if (!signupData.fname.trim()) newErrors.fname = 'First name is required';
    if (!signupData.lname.trim()) newErrors.lname = 'Last name is required';
    if (!signupData.email.trim() || !/\S+@\S+\.\S+/.test(signupData.email)) {
      newErrors.email = 'Valid email is required';
    }
    if (!signupData.password.trim() || signupData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (!signupData.creditCard.trim() || !/^\d{16}$/.test(signupData.creditCard)) {
      newErrors.creditCard = 'Credit card must be 16 digits';
    }
    if (!signupData.expiry.trim()) newErrors.expiry = 'Expiry date is required';
    if (!signupData.cvv.trim() || !/^\d{3,4}$/.test(signupData.cvv)) {
      newErrors.cvv = 'CVV must be 3 or 4 digits';
    }
    if (!signupData.street.trim()) newErrors.street = 'Street address is required';
    if (!signupData.city.trim()) newErrors.city = 'City is required';
    if (!signupData.province.trim()) newErrors.province = 'Province is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignupChange = (e) => {
    const { name, value } = e.target;
    setSignupData({ ...signupData, [name]: value });
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (loginData.email && loginData.password) {
      onLogin(loginData);
    } else {
      alert('Invalid login credentials');
    }
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    if (validateSignup()) {
      alert('Signup successful!');
      setIsSignup(false);
    }
  };

  return (
    <div className="kidswear-container">
      <div className="menswear-overlay">
        <div className="menswear-content">
         <h1 className="menswear-title">Log in to make a purchase.</h1>
          <div className="login-signup-container">
            {isSignup ? (
              <form onSubmit={handleSignupSubmit}>
                <h1>Sign Up</h1>
                <input
                  type="text"
                  name="fname"
                  placeholder="First Name"
                  value={signupData.fname}
                  onChange={handleSignupChange}
                />
                {errors.fname && <p className="error">{errors.fname}</p>}
                <input
                  type="text"
                  name="lname"
                  placeholder="Last Name"
                  value={signupData.lname}
                  onChange={handleSignupChange}
                />
                {errors.lname && <p className="error">{errors.lname}</p>}
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={signupData.email}
                  onChange={handleSignupChange}
                />
                {errors.email && <p className="error">{errors.email}</p>}
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={signupData.password}
                  onChange={handleSignupChange}
                />
                {errors.password && <p className="error">{errors.password}</p>}
                <input
                  type="text"
                  name="creditCard"
                  placeholder="Credit Card Number"
                  value={signupData.creditCard}
                  onChange={handleSignupChange}
                />
                {errors.creditCard && <p className="error">{errors.creditCard}</p>}
                <input
                  type="text"
                  name="expiry"
                  placeholder="Expiry (MM/YY)"
                  value={signupData.expiry}
                  onChange={handleSignupChange}
                />
                {errors.expiry && <p className="error">{errors.expiry}</p>}
                <input
                  type="text"
                  name="cvv"
                  placeholder="CVV"
                  value={signupData.cvv}
                  onChange={handleSignupChange}
                />
                {errors.cvv && <p className="error">{errors.cvv}</p>}
                <input
                  type="text"
                  name="street"
                  placeholder="Street"
                  value={signupData.street}
                  onChange={handleSignupChange}
                />
                {errors.street && <p className="error">{errors.street}</p>}
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={signupData.city}
                  onChange={handleSignupChange}
                />
                {errors.city && <p className="error">{errors.city}</p>}
                <select
                  name="province"
                  value={signupData.province}
                  onChange={handleSignupChange}
                >
                  <option value="">Select Province</option>
                  {provinces.map((prov) => (
                    <option key={prov} value={prov}>
                      {prov}
                    </option>
                  ))}
                </select>
                {errors.province && <p className="error">{errors.province}</p>}
                <button type="submit">Sign Up</button>
                <p>
                  Already have an account?{" "}
                  <button type="button" onClick={() => setIsSignup(false)}>
                    Log In
                  </button>
                </p>
              </form>
            ) : (
              <form onSubmit={handleLoginSubmit}>
                <h1>Log In</h1>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={loginData.email}
                  onChange={handleLoginChange}
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={loginData.password}
                  onChange={handleLoginChange}
                />
                <button type="submit">Log In</button>
                <p>
                  Don't have an account?{" "}
                  <button type="button" onClick={() => setIsSignup(true)}>
                    Sign Up
                  </button>
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
