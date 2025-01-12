import React from 'react';
import {styled} from 'styled-components';

import {shortenAddress} from '../../utils';
import {IconChevronDown} from '../icons';
import {ListItemVoter} from '../listItem/voter';

export type VoterType = {
  wallet: string;
  src: string;
  option: 'yes' | 'abstain' | 'no' | 'approved' | 'none';
  votingPower?: string;
  tokenAmount?: string | number;
  tokenSymbol?: string;
  voteReplaced?: boolean;
  walletTag?: 'You' | 'Your delegate';
};

export type VotersTableProps = {
  voters: VoterType[];
  page?: number;
  LoadMoreLabel: string;
  onLoadMore?: () => void;
  showOption?: boolean;
  showAmount?: boolean;
  pageSize?: number; // number of rows to show
  explorerURL: string;
};

const colorScheme = (option: VoterType['walletTag']) =>
  option === 'You' ? 'neutral' : 'info';

export const VotersTable: React.FC<VotersTableProps> = ({
  voters,
  LoadMoreLabel,
  onLoadMore,
  page = 1,
  showAmount = false,
  pageSize = 3,
  explorerURL,
}) => {
  const displayedVoters = page * pageSize;

  return (
    <Container data-testid="votersTable">
      {voters.slice(0, displayedVoters).map((voter, index) => (
        <ListItemVoter
          key={index}
          label={shortenAddress(voter.wallet)}
          src={voter.src}
          option={voter.option}
          onClick={() => {
            window.open(`${explorerURL}address/${voter.wallet}`, '_blank');
          }}
          voteReplaced={voter.voteReplaced}
          {...(voter.walletTag && {
            walletTag: {
              colorScheme: colorScheme(voter.walletTag),
              label: voter.walletTag || '',
            },
          })}
          {...(showAmount && {
            tokenInfo: {
              amount: voter.tokenAmount as string,
              symbol: voter.tokenSymbol as string,
            },
          })}
        />
      ))}
      {onLoadMore &&
        voters.length > pageSize &&
        displayedVoters < voters.length && (
          <LoadMoreContainer onClick={onLoadMore}>
            <Link>
              <LinkLabel>{LoadMoreLabel}</LinkLabel>
              <IconChevronDown />
            </Link>
          </LoadMoreContainer>
        )}
    </Container>
  );
};

const Container = styled.div.attrs({
  className: 'w-full border-2 rounded-xl whitespace-nowrap',
})`
  button:first-child {
    border-top-right-radius: 12px;
    border-top-left-radius: 12px;
  }

  button:last-child {
    border-bottom-right-radius: 12px;
    border-bottom-left-radius: 12px;
    border-bottom-width: 0;
  }
`;

const LoadMoreContainer = styled.button.attrs({
  className: 'px-2 py-1.5',
})``;

const Link = styled.a.attrs({
  className: 'flex items-center min-w-0 text-primary-500 space-x-1.5',
})``;

const LinkLabel = styled.p.attrs({
  className: 'font-semibold',
})``;
