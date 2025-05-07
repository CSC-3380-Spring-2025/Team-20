
"use client";

import React from "react";
import styles from "../../bio/styles/profile.module.css";

//similar to bio. mostly copy paste of other text fields
interface SocialAccountsSectionProps {
  socialAccounts: string[];
  setSocialAccounts: (accounts: string[]) => void;
}

const SocialAccountsSection: React.FC<SocialAccountsSectionProps> = ({ 
  socialAccounts, 
  setSocialAccounts 
}) => {
  const handleSocialAccountChange = (index: number, value: string) => {
    const newSocialAccounts = [...socialAccounts];
    newSocialAccounts[index] = value;
    setSocialAccounts(newSocialAccounts);
  };

  return (
    <div>
      <label className={styles.labelNames}>Social Accounts</label>
      {socialAccounts.map((account, index) => (
        <div key={index} className={styles.socialAccountsContainer}>
          <input
            className={styles.socialAccountsInput}
            type="text"
            placeholder={`Link to social profile ${index + 1}`}
            value={account}
            onChange={(e) => handleSocialAccountChange(index, e.target.value)}
          />
        </div>
      ))}
    </div>
  );
};



export default SocialAccountsSection;