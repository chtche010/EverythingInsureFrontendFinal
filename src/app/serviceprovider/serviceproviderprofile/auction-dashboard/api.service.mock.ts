import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

 

@Injectable({

    providedIn: 'root',

})

export class ApiServiceMock {

    // Mock data for auction events

    private mockAuctionEvents: any[] = [

        // Add your mock auction events data here

        // Example:

        { auctionId: 1, auctionTitle: 'Auction Event 1', auctionDate: '2023-09-25', startTime: '10:05', endTime: '16:00', vehicleMake:'Toyota', vehicleModel: 'Hilux', modelYear: '2016', MMcode: '60039490',

        addressId:'21 Crescent Street, Pinelands, Cape Town, 7405, Western Cape, South Africa',

        damageDescription: 'The front of the Hilux has absorbed the brunt of the impact. The grille is crushed, and the headlights are shattered. The front bumper is severely dented and partially detached. The hood is crumpled and may be bent out of shape. The radiator and engine components might have suffered damage as well. The front fenders on both sides are dented and possibly torn. The side panels show signs of deformation and may have deep scratches or paint chipping. The severity of the impact has likely affected the structural integrity of these areas. The windshield has cracked or shattered due to the force of the collision. Other glass surfaces, such as the side windows and rearview mirrors, might also be broken or damaged. The wheels on the impacted side(s) may be bent or misaligned. The suspension components could be affected, leading to potential difficulties in steering and handling.',

        images: ['https://www.findapart.ie/carpics/280/cars/265903/IMG_20190530_113006.jpg',

        'https://media.istockphoto.com/id/175195079/photo/a-red-car-with-a-damaged-headlight-after-an-accident.jpg?s=612x612&w=0&k=20&c=xM6qXM58jCojDt9wr-g2TRZyBGrL75oy_re2nryRiIw=',

        'https://img.freepik.com/free-photo/car-damage-road-accident-car-insurance_1150-18101.jpg?w=2000',

        'https://media.istockphoto.com/id/850346406/photo/car-crash-accident-on-the-road.webp?b=1&s=170667a&w=0&k=20&c=92dU6-F0A8j_A0vmDFRs1--yfd-SArZ_JIOPUoby7ys=',

        'https://brightonpanelworks.com.au/wp-content/uploads/2019/10/auto-3734396_1280.jpg',

        'https://lirp.cdn-website.com/5db48381c8ae431eb5324cc0c2e7772a/dms3rep/multi/opt/1531822-blog103-640w.jpg'] },

        { auctionId: 2, auctionTitle: 'Auction Event 2', auctionDate: '2023-09-26', startTime: '15:00', endTime: '18:00', vehicleMake:'BMW', vehicleModel: '1 Series', modelYear: '2017', MMcode: '890876673',

        addressId:'12 Gains Street, Rondebosch, Cape Town, 7450, Western Cape, South Africa',

        damageDescription: 'The front of the BMW has absorbed the brunt of the impact. The grille is crushed, and the headlights are shattered. The front bumper is severely dented and partially detached. The hood is crumpled and may be bent out of shape. The radiator and engine components might have suffered damage as well. The front fenders on both sides are dented and possibly torn. The side panels show signs of deformation and may have deep scratches or paint chipping. The severity of the impact has likely affected the structural integrity of these areas. The windshield has cracked or shattered due to the force of the collision. Other glass surfaces, such as the side windows and rearview mirrors, might also be broken or damaged. The wheels on the impacted side(s) may be bent or misaligned. The suspension components could be affected, leading to potential difficulties in steering and handling.',

        images: ['https://brightonpanelworks.com.au/wp-content/uploads/2019/10/auto-3734396_1280.jpg',

        'https://media.istockphoto.com/id/175195079/photo/a-red-car-with-a-damaged-headlight-after-an-accident.jpg?s=612x612&w=0&k=20&c=xM6qXM58jCojDt9wr-g2TRZyBGrL75oy_re2nryRiIw=',

        'https://img.freepik.com/free-photo/car-damage-road-accident-car-insurance_1150-18101.jpg?w=2000',

        'https://media.istockphoto.com/id/850346406/photo/car-crash-accident-on-the-road.webp?b=1&s=170667a&w=0&k=20&c=92dU6-F0A8j_A0vmDFRs1--yfd-SArZ_JIOPUoby7ys=',

        'https://brightonpanelworks.com.au/wp-content/uploads/2019/10/auto-3734396_1280.jpg',

        'https://lirp.cdn-website.com/5db48381c8ae431eb5324cc0c2e7772a/dms3rep/multi/opt/1531822-blog103-640w.jpg'] },

        { auctionId: 3, auctionTitle: 'Honda Jazz Auction Event', auctionDate: '2023-08-23', startTime: '8:00', endTime: '20:00', vehicleMake:'Honda', vehicleModel: 'Jazz 1.5i', modelYear: '2015', MMcode: '45678377',

        addressId:'12 Gains Street, Rondebosch, Cape Town, 7450, Western Cape, South Africa',

        damageDescription: 'The front of the Honda has absorbed the brunt of the impact. The grille is crushed, and the headlights are shattered. The front bumper is severely dented and partially detached. The hood is crumpled and may be bent out of shape. The radiator and engine components might have suffered damage as well. The front fenders on both sides are dented and possibly torn. The side panels show signs of deformation and may have deep scratches or paint chipping. The severity of the impact has likely affected the structural integrity of these areas. The windshield has cracked or shattered due to the force of the collision. Other glass surfaces, such as the side windows and rearview mirrors, might also be broken or damaged. The wheels on the impacted side(s) may be bent or misaligned. The suspension components could be affected, leading to potential difficulties in steering and handling.',

        images: ['https://m.autolina.ch/bild/honda-jazz-kleinwagen-occasion--gebraucht/28/217/3822675_1.jpg',

        'https://media.istockphoto.com/id/175195079/photo/a-red-car-with-a-damaged-headlight-after-an-accident.jpg?s=612x612&w=0&k=20&c=xM6qXM58jCojDt9wr-g2TRZyBGrL75oy_re2nryRiIw=',

        'https://img.freepik.com/free-photo/car-damage-road-accident-car-insurance_1150-18101.jpg?w=2000',

        'https://media.istockphoto.com/id/850346406/photo/car-crash-accident-on-the-road.webp?b=1&s=170667a&w=0&k=20&c=92dU6-F0A8j_A0vmDFRs1--yfd-SArZ_JIOPUoby7ys=',

        'https://brightonpanelworks.com.au/wp-content/uploads/2019/10/auto-3734396_1280.jpg',

        'https://lirp.cdn-website.com/5db48381c8ae431eb5324cc0c2e7772a/dms3rep/multi/opt/1531822-blog103-640w.jpg'] },
        { auctionId: 4, auctionTitle: 'Mercedes-Benz', auctionDate: '2023-08-15', startTime: '7:00', endTime: '21:00', vehicleMake:'Mercedes-Benz', vehicleModel: 'GLB 220 D 4M', modelYear: '2020', MMcode: '87653563',

        addressId:'15 Tren Road, Rondebosch, Cape Town, 7450, Western Cape, South Africa',

        damageDescription: 'The front of the Mercedes-Benz has absorbed the brunt of the impact. The grille is crushed, and the headlights are shattered. The front bumper is severely dented and partially detached. The hood is crumpled and may be bent out of shape. The radiator and engine components might have suffered damage as well. The front fenders on both sides are dented and possibly torn. The side panels show signs of deformation and may have deep scratches or paint chipping. The severity of the impact has likely affected the structural integrity of these areas. The windshield has cracked or shattered due to the force of the collision. Other glass surfaces, such as the side windows and rearview mirrors, might also be broken or damaged. The wheels on the impacted side(s) may be bent or misaligned. The suspension components could be affected, leading to potential difficulties in steering and handling.',

        images: ['https://image-prod.iol.co.za/16x9/800/?source=https://xlibris.public.prod.oc.inl.infomaker.io:8443/opencontent/objects/3d2a4b11-bc17-500f-9f34-71fb88f6e131&operation=CROP&offset=0x4&resize=3000x1687',

        'https://media.istockphoto.com/id/175195079/photo/a-red-car-with-a-damaged-headlight-after-an-accident.jpg?s=612x612&w=0&k=20&c=xM6qXM58jCojDt9wr-g2TRZyBGrL75oy_re2nryRiIw=',

        'https://img.freepik.com/free-photo/car-damage-road-accident-car-insurance_1150-18101.jpg?w=2000',

        'https://media.istockphoto.com/id/850346406/photo/car-crash-accident-on-the-road.webp?b=1&s=170667a&w=0&k=20&c=92dU6-F0A8j_A0vmDFRs1--yfd-SArZ_JIOPUoby7ys=',

        'https://brightonpanelworks.com.au/wp-content/uploads/2019/10/auto-3734396_1280.jpg',

        'https://lirp.cdn-website.com/5db48381c8ae431eb5324cc0c2e7772a/dms3rep/multi/opt/1531822-blog103-640w.jpg'] }

    ];

 

    getAuctionEvents(): Observable<any[]> {

        // Simulate an API call by returning the mock auction events data as an Observable

        return of(this.mockAuctionEvents);

    }

 

    getAuctionDetails(auctionId: number): Observable<any> {

        // Simulate an API call to fetch detailed auction information

        // Replace this with your actual API call to get auction details from the backend

        const getAuctionDetails = this.mockAuctionEvents.find(auction => auction.auctionId === auctionId);

 

        if (getAuctionDetails) {

            return of({

                ...getAuctionDetails,

                startTime: getAuctionDetails.startTime,

                endTime: getAuctionDetails.endTime

            });

        }

        return of(null);//retun null if auction details aren't found

        // return of(getAuctionDetails); // Return the detailed auction information as an Observable

    }

 

    // Add the submitBid method to submit a bid to the backend

    submitBid(bidData: any) {

        // Mock the response with sample data

        const mockResponse = { success: true, message: 'Bid submitted successfully' };

 

        // Return the response as an observable using the of function

        return of(mockResponse);

    }

 

}

 