import { render } from '@testing-library/react';
import { FlightInfo, FlightInfoRowProps } from './FlightInfo';

describe('FlightInfo', () => {
    const defaultProps: FlightInfoRowProps = {
        label: 'Test Label',
        value: 'Test Value',
    };

    it('renders with default props', () => {
        const { getByText } = render(<FlightInfo {...defaultProps}/>);

        expect(getByText('Test Label:')).toBeInTheDocument();
    });

    it('renders colored text when coloredText is true', () => {
        const { getByText } = render(<FlightInfo {...defaultProps} coloredText statusColor="red" />);

        expect(getByText('Test Label:')).toBeInTheDocument();
        expect(getByText('Test Value')).toHaveStyle('color: red; font-weight: bold; margin-left: 5px;');
    });
});
