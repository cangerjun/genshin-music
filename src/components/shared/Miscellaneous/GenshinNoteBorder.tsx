interface NoteBorderProps {
    fill?: string,
    className?: string
}

export default function NoteBorder({fill, className}: NoteBorderProps) {
    return <svg
        width="156mm"
        height="156mm"
        className={className}
        viewBox="0 0 156 156"
        xmlns="http://www.w3.org/2000/svg"
        style={{fill: fill || '#eae5ce'}}
    >
        <path
            d="M 78.00026,10.550111 C 51.476969,10.181626 25.897505,27.22936 15.85058,51.745551 5.361171,75.829889 10.788685,105.74811 29.175285,124.53663 46.865842,143.57562 76.01089,150.52219 100.41467,141.63611 125.70972,133.0432 144.35989,108.19482 145.36211,81.471209 147.04137,55.492614 131.98362,29.525813 108.70692,17.929174 99.25071,13.06968 88.62966,10.533948 78.00026,10.550111 Z m 0,0.140044 c 2.58037,3.675401 5.16075,7.3508 7.74113,11.026201 24.63414,2.976727 45.57649,23.919913 48.5469,48.555693 3.66955,2.57607 7.33909,5.15214 11.00864,7.72821 -3.6711,2.57728 -7.34219,5.15455 -11.01328,7.73183 -2.97314,24.642991 -23.92605,45.594011 -48.5712,48.558271 -2.57073,3.66162 -5.14146,7.32324 -7.71219,10.98486 -2.57073,-3.66162 -5.141461,-7.32324 -7.712192,-10.98486 -24.643357,-2.96412 -45.595396,-23.91214 -48.570678,-48.553111 -3.673332,-2.57899 -7.346667,-5.15799 -11.019999,-7.73699 3.677467,-2.58193 7.354932,-5.16386 11.0324,-7.74578 2.977996,-24.622822 23.903746,-45.560994 48.529337,-48.537607 2.580378,-3.675573 5.160752,-7.351144 7.741132,-11.026717 z"
        />
    </svg>
}